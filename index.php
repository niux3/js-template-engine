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
<template id="tplIndexPosts">
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
</template>
<template id="tplUsersList">
    <dl>
        {% for(let user of users){ %}
            <dt>{%- user.name %}</dt>
            <dd>{%= user.interests %}</dd>
        {% } %}
    </dl>
</template>
    <script type="module" src="TemplateEngine.js?v=<?= time() ?>"></script>
    <script type="module" src="app.js?v=<?= time() ?>"></script>
</body>
</html>
