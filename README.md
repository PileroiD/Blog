Области хранения данных:
- data base JSON-Server
- BFF
- redux store

Сущности приложения:
- User: 
    - DB (List of users)
    - BFF (Current user session)
    - Redux Store (Display in browser)
- User Role:
    - DB (List of roles)
    - BFF (Current user session with role)
    - Redux Store (Usage on client)
- Posts:
    - DB (List of articles)
    - Redux Store (Display in browser)
- Comments:
    - DB (List of comments)
    - Redux Store (Display in browser)

Таблицы DB:
- users: id / login / password / registered_at(date) / role_id
- roles: id / name
- posts: id / title / image_url / content / published_at(date)
- comments: id / author_id / post_id / content /published_at

Схема состояния на BFF:
- сессия текущего пользователя: login / password / role

Схема для Redux Store на клиенте:
- user: id / login / roleId / session
- posts:массив post: id / title / imageUrl / publishedAt / commentsCount
- post: id / title / imageUrl / content / publishedAt / comments: массив comment: id / author / content / publishedAt
- users: массив user: id / login / registeredAt / role