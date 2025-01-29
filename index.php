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
<script id="usageList" type="text/template">
    <table cellspacing='0' cellpadding='0' border='1'>
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
            </tr>
        </thead>
        <tbody>
            <%
            // repeat items
            for (var i = 0; i < users.length; i++) {
                var item = users[i],
                    key = i;
            %>
            <tr>
                <!-- use variables -->
                <td><%= key %></td>
                <td class="">
                    <!-- use %- to inject un-sanitized user input (see 'Demo of XSS hack') -->
                    <h3><%= item.name %></h3>
                    <p><%= item.interests %></p>
                </td>
            </tr>
            <% } %>
        </tbody>
    </table>
</script>
    <script type="module" src="template.js?v=<?= time() ?>"></script>
    <script type="module" src="app.js?v=<?= time() ?>"></script>
</body>
</html>
