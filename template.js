class TemplateEngine {
    #template
    #tokens
    #escape

    constructor(template) {
        this.#template = template
        this.#tokens = this.#tokenize()
        this.#escape = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
        }

    }

    #tokenize() {
        let regex = /{%=?-?([\s\S]+?)%}|([^{%]+)/g,
            match,
            tokens = []

        while ((match = regex.exec(this.#template)) !== null) {
            if (match[1]) {
                let code = match[1].trim()
                if (match[0].startsWith("{%=")) {
                    tokens.push({ type: "OUTPUT_ESCAPED", value: code })
                } else if (match[0].startsWith("{%-")) {
                    tokens.push({ type: "OUTPUT_RAW", value: code })
                } else {
                    tokens.push({ type: "JS_CODE", value: code })
                }
            } else if (match[2]) {
                tokens.push({ type: "TEXT", value: match[2] })
            }
        }

        return tokens
    }

    #compile() {
        let code = `let output = ""; \n`,
            escapeHTML = str => String(str).replace(/[&<>"']/g, (match) => {
                return this.#escape[match] || match
            })

        this.#tokens.forEach(token => {
            switch (token.type) {
                case "TEXT":
                    code += `output += ${JSON.stringify(token.value)};\n`
                    break
                case "OUTPUT_ESCAPED":
                    code += `output += escapeHTML(${token.value});\n`
                    break
                case "OUTPUT_RAW":
                    code += `output += ${token.value};\n`
                    break
                case "JS_CODE":
                    code += `${token.value}\n`
                    break
            }
        })

        code += `return output;`
        return new Function("data", "escapeHTML", `with(data) { ${code} }`)
    }

    render(data) {
        let renderFunction = this.#compile()
        return renderFunction(data, str => str.replace(/[&<>"']/g, match => {
            return this.#escape[match] || match
        }))
    }
}

// Exemple d'utilisation :
const template = `
<h1>{%- title %}</h1>
<p>{%- description %}</p>

{% if (showProducts) { %}
  <ul>
    {% for (const item of items) { %}
      <li>{%- item.name.toUpperCase() %} - {%- item.name %} - {%- item.price %}</li>
    {% } %}
  </ul>
{% } else if (showDiscounts) { %}
  <p>Voici les promotions !</p>
{% } else { %}
  <p>Aucun produit disponible actuellement.</p>
{% } %}
`

const data = {
  title: "<span>Bienvenue</span>",
  description: "Découvrez notre sélection !",
  showProducts: true,
  showDiscounts: false,
  items: [
    { name: "Produit 1", price: "10€" },
    { name: "Produit 2", price: "15€" },
],
}

const engine = new TemplateEngine(template)
console.log(engine.render(data))
