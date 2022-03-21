<h1>Notes</h1>

<ul class="postList">
  {% for post in site.notes %}
  <li>
    <h3>
      <a href="{{ post.url }}"> {{ post.title }} </a>
    </h3>
  </li>
  {% endfor %}
</ul>

