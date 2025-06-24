INSERT INTO
    roles (id, nombre)
VALUES
    (UUID (), 'Admin'),
    (UUID (), 'Cliente');

-- Insertar usuarios
INSERT INTO
    usuarios (id, nombre, email, password, rol_id)
VALUES
    (
        UUID (),
        'Juan Pérez',
        'juan@example.com',
        'hashed_password_juan',
        (
            SELECT
                id
            FROM
                roles
            WHERE
                nombre = 'Cliente'
        )
    ),
    (
        UUID (),
        'Ana Gómez',
        'ana@example.com',
        'hashed_password_ana',
        (
            SELECT
                id
            FROM
                roles
            WHERE
                nombre = 'Admin'
        )
    );

-- Insertar perfiles
INSERT INTO
    perfiles (id, usuario_id, telefono, direccion, ciudad, pais)
VALUES
    (
        UUID (),
        (
            SELECT
                id
            FROM
                usuarios
            WHERE
                email = 'juan@example.com'
        ),
        '3001234567',
        'Calle 123',
        'Bogotá',
        'Colombia'
    ),
    (
        UUID (),
        (
            SELECT
                id
            FROM
                usuarios
            WHERE
                email = 'ana@example.com'
        ),
        '3129876543',
        'Av. Siempre Viva',
        'Lima',
        'Perú'
    );

-- Insertar categorías de productos
INSERT INTO
    categorias (id, nombre, descripcion)
VALUES
    (UUID (), 'Anillos', 'Anillos de oro y plata'),
    (UUID (), 'Collares', 'Collares elegantes');

-- Insertar productos
INSERT INTO
    productos (
        id,
        nombre,
        descripcion,
        material,
        peso,
        precio,
        stock,
        imagen_url,
        categoria_id
    )
VALUES
    (
        UUID (),
        'Anillo de Oro 18k',
        'Anillo elegante de oro 18 quilates',
        'Oro 18k',
        5.2,
        1500.00,
        10,
        'https://example.com/anillo1.jpg',
        (
            SELECT
                id
            FROM
                categorias
            WHERE
                nombre = 'Anillos'
        )
    ),
    (
        UUID (),
        'Collar de Plata',
        'Hermoso collar de plata esterlina',
        'Plata 925',
        8.5,
        850.00,
        5,
        'https://example.com/collar1.jpg',
        (
            SELECT
                id
            FROM
                categorias
            WHERE
                nombre = 'Collares'
        )
    );

-- Insertar pedidos
INSERT INTO
    pedidos (id, usuario_id, estado, total)
VALUES
    (
        UUID (),
        (
            SELECT
                id
            FROM
                usuarios
            WHERE
                email = 'juan@example.com'
        ),
        'pendiente',
        2350.00
    );

-- Insertar productos en pedidos
INSERT INTO
    productos_pedido (
        id,
        pedido_id,
        producto_id,
        cantidad,
        precio_unitario
    )
VALUES
    (
        UUID (),
        '41b67403-fd66-11ef-93f8-089798eebe36',
        (
            SELECT
                id
            FROM
                productos
            WHERE
                nombre = 'Anillo de Oro 18k'
        ),
        1,
        1500.00
    ),
    (
        UUID (),
        '41b67403-fd66-11ef-93f8-089798eebe36',
        (
            SELECT
                id
            FROM
                productos
            WHERE
                nombre = 'Collar de Plata'
        ),
        1,
        850.00
    );

-- Insertar ventas
INSERT INTO
    ventas (id, pedido_id, usuario_id, total, metodo_pago)
VALUES
    (
        UUID (),
        (
            SELECT
                id
            FROM
                pedidos
            LIMIT
                1
        ),
        (
            SELECT
                id
            FROM
                usuarios
            WHERE
                email = 'juan@example.com'
        ),
        2350.00,
        'tarjeta'
    );

-- Insertar pedidos
INSERT INTO
    pedidos (id, estado, total)
VALUES
    (UUID (), 'pendiente', 2350.00);

-- Insertar relación en pedido_por_usuario
INSERT INTO
    pedido_por_usuario (id, usuario_id, pedido_id)
VALUES
    (
        UUID (),
        (
            SELECT
                id
            FROM
                usuarios
            WHERE
                email = 'yhon8aM@gmail.com'
        ),
        (
            SELECT
                id
            FROM
                pedidos
            LIMIT
                1
        )
    );

    SELECT
        `Usuario`.`id` AS `Usuario_id`,
        `Usuario`.`nombre` AS `Usuario_nombre`,
        `Usuario`.`email` AS `Usuario_email`,
        `Usuario`.`rol_id` AS `Usuario_rol_id`,
        `Usuario`.`password` AS `Usuario_password`,
        `Usuario`.`password`,
        rol.nombre
        FROM
            `usuarios` `Usuario`
        INNER JOIN `roles` `roles` ON `roles`.`id`=`Usuario`.`rol_id`
        WHERE `Usuario`.`email` = 'yhon8aM@gmail.com'"