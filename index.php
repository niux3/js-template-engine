<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="target_a"></div>
    <div id="target_b"></div>
    <script id="tplIndexPosts" type="text/template">
        <h1>{%= title %}</h1>
        <p>{%- description %}</p>
        {% if (showPosts) { %}
          <ul>
            {% for (let post of posts) { %}
              <li>
                <a href="{%- post.url %}">
                    <span>{%- post.title %}</span>
                </a>
                {% if (post.tags.length) { %}
                    <span> ({%- post.tags.join(', ') %})</span>
                {% } %}
            </li>
            {% } %}
          </ul>
        {% } else if (showProducts) { %}
          <h1>Nos produits</h1>
          <p>{%- products.join(', ') %}</p>
        {% } else { %}
          <p>Rien à afficher</p>
        {% } %}
    </script>
    <script id="tplUsersList" type="text/template">
        <table cellspacing='0' cellpadding='0' border='1'>
            {% for(let [ index, user ] of Object.entries(users)){ 
                let id = parseInt(index, 10) + 1
            %}
                <tr>
                    <td>{%- id %}</td>
                    <td>{%- user.name %}</td>
                    <td>{%- user.interests %}</td>
                </tr>
            {% } %}
        </table>
    </script>
    <script type="module" src="TemplateEngine.js"></script>
    <script type="module" src="app.js"></script>
</body>
</html>
