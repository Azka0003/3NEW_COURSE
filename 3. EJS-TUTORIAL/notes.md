taking products as in index products hi hai 

| Tag      | What happens in your file                        |
| -------- | ------------------------------------------------ |
| `<%- %>` | Used to include HTML file directly (header)      |
| `<%= %>` | Prints variables like `title` or `product.title` |
| `<% %>`  | Runs JS logic (loop or condition)                |
🧠 If you had used <%= include('components/header.ejs') %>, it would print raw EJS code as text — that’s why we use <%- ... %>. 

