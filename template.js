class TemplateLexer {
  constructor(template) {
    this.template = template;
    this.tokens = [];
    this.tokenize();
  }

  tokenize() {
    const regex = /{%=?-?([\s\S]+?)%}|([^{%]+)/g;
    let match;

    while ((match = regex.exec(this.template)) !== null) {
      if (match[1]) {
        const code = match[1].trim(); // Supprime <% et %>
        if (match[0].startsWith("{%=")) {
          this.tokens.push({ type: "OUTPUT_ESCAPED", value: code });
        } else if (match[0].startsWith("{%-")) {
          this.tokens.push({ type: "OUTPUT_RAW", value: code });
        } else {
          this.tokens.push({ type: "JS_CODE", value: code });
        }
      } else if (match[2]) {
        this.tokens.push({ type: "TEXT", value: match[2] });
      }
    }
  }
}

class TemplateCompiler {
  constructor(tokens) {
    this.tokens = tokens;
  }

  compile() {
    let code = `let output = ""; \n`;

    const escapeHTML = (str) => String(str).replace(/[&<>"']/g, (match) => {
      const escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      };
      return escapeMap[match] || match;
    });

    this.tokens.forEach((token) => {
      switch (token.type) {
        case "TEXT":
          code += `output += ${JSON.stringify(token.value)};\n`;
          break;
        case "OUTPUT_ESCAPED":
          code += `output += escapeHTML(${token.value});\n`;
          break;
        case "OUTPUT_RAW":
          code += `output += ${token.value};\n`;
          break;
        case "JS_CODE":
          code += `${token.value}\n`;
          break;
      }
    });

    code += `return output;`;
    return new Function("data", "escapeHTML", `with(data) { ${code} }`);
  }
}
const template = `
<h1>{%= title %}</h1>
<p>{%- description %}</p>

{% if (1 + 1 === 2) { %}
  <ul>
    {% for (const item of items) { %}
      <li>{%- item.name %} - {%- item.price %}</li>
    {% } %}
    {% if (showDiscounts) { %}
    <li>
      <ul>
    {% for (const item of items) { %}
      <li>{%- item.name %} - {%- item.price %}</li>
    {% } %}
      
      </ul>
    </li>
    {% } %}
  </ul>
{% } else if (showDiscounts) { %}
  <p>Voici les promotions !</p>
{% } else { %}
  <p>Aucun produit disponible actuellement.</p>
{% } %}
`;

const data = {
  title: "Bienvenue",
  description: "Découvrez notre sélection !",
  showProducts: true,
  showDiscounts: true,
  items: [
    { name: "Produit 1", price: "10€" },
    { name: "Produit 2", price: "15€" },
  ],
};

const lexer = new TemplateLexer(template);
console.log(lexer.tokens); 

const compiler = new TemplateCompiler(lexer.tokens);
const renderFunction = compiler.compile();

const output = renderFunction(data, (str) => str.replace(/[&<>"']/g, (match) => {
  const escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return escapeMap[match] || match;
}));

console.log(output);

