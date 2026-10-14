import os
import csv

os.makedirs('dataset', exist_ok=True)

# 1. DEPARTAMENTOS
deptos = [
    (1, 'Tecnología e Innovación', 150000000.00, 'Bogotá'),
    (2, 'Ventas y Comercio', 200000000.00, 'Medellín'),
    (3, 'Operaciones y Logística', 120000000.00, 'Cali'),
    (4, 'Recursos Humanos', 80000000.00, 'Bogotá'),
    (5, 'Finanzas y Contabilidad', 110000000.00, 'Barranquilla')
]
with open('dataset/departamentos.csv', 'w', newline='', encoding='utf-8') as f:
    w = csv.writer(f)
    w.writerow(['depto_id', 'nombre', 'presupuesto', 'ciudad'])
    w.writerows(deptos)

# 2. EMPLEADOS
empleados = [
    (101, 'Carlos Mendoza', 8500000.00, '2021-03-15', '', 1),
    (102, 'Ana María Gómez', 6200000.00, '2022-01-10', 101, 1),
    (103, 'Luis Fernando Torres', 4800000.00, '2023-05-20', 101, 1),
    (104, 'Sofía Ramírez', 9000000.00, '2020-11-01', '', 2),
    (105, 'Diego Alejandro Silva', 5500000.00, '2022-08-14', 104, 2),
    (106, 'Valentina Morales', 5100000.00, '2023-02-28', 104, 2),
    (107, 'Javier Castro', 7000000.00, '2019-06-12', '', 3),
    (108, 'Mariana López', 4200000.00, '2024-01-15', 107, 3),
    (109, 'Andrés Felipe Herrera', 6500000.00, '2021-09-01', '', 4),
    (110, 'Camila Ospina', 5800000.00, '2022-10-05', '', 5)
]
with open('dataset/empleados.csv', 'w', newline='', encoding='utf-8') as f:
    w = csv.writer(f)
    w.writerow(['empleado_id', 'nombre', 'salario', 'fecha_ingreso', 'jefe_id', 'depto_id'])
    w.writerows(empleados)

# 3. CLIENTES
clientes = [
    (201, 'Tech Solutions S.A.S.', 'Bogotá', 'Empresarial', '2022-04-10'),
    (202, 'Comercializadora del Valle', 'Cali', 'Empresarial', '2021-08-19'),
    (203, 'Juan Pablo Restrepo', 'Medellín', 'Individual', '2023-01-12'),
    (204, 'Inversiones Caribe Ltd.', 'Barranquilla', 'Empresarial', '2022-11-30'),
    (205, 'Diana Marcela Vargas', 'Bogotá', 'VIP', '2020-05-14'),
    (206, 'Servicios Logísticos del Eje', 'Pereira', 'Empresarial', '2023-07-22'),
    (207, 'Mateo Gutiérrez', 'Bucaramanga', 'Individual', '2024-02-01')
]
with open('dataset/clientes.csv', 'w', newline='', encoding='utf-8') as f:
    w = csv.writer(f)
    w.writerow(['cliente_id', 'nombre', 'ciudad', 'categoria_cliente', 'fecha_registro'])
    w.writerows(clientes)

# 4. PRODUCTOS
productos = [
    (301, 'Servidor Cloud Enterprise X1', 'Infraestructura', 12500000.00, 15, '{"cores": 64, "ram_gb": 256, "ssd_tb": 4}'),
    (302, 'Laptop Pro Developer 16', 'Hardware', 8200000.00, 30, '{"pantalla": "16 in", "ram_gb": 32, "gpu": "RTX 4070"}'),
    (303, 'Licencia Base de Datos Pro', 'Software', 4500000.00, 100, '{"usuarios": 50, "soporte": "24/7", "tipo": "Anual"}'),
    (304, 'Switch Administrable 48P', 'Redes', 3100000.00, 25, '{"puertos": 48, "poe": true, "velocidad_gbps": 10}'),
    (305, 'Monitor Ultrawide 34 IPS', 'Periféricos', 2400000.00, 45, '{"resolucion": "3440x1440", "hz": 144}'),
    (306, 'Router Industrial VPN', 'Redes', 1850000.00, 20, '{"puertos": 8, "vpn_throughput": "1Gbps"}')
]
with open('dataset/productos.csv', 'w', newline='', encoding='utf-8') as f:
    w = csv.writer(f)
    w.writerow(['producto_id', 'nombre', 'categoria', 'precio', 'stock', 'especificaciones'])
    w.writerows(productos)

# 5. PEDIDOS
pedidos = [
    (501, 201, 104, '2024-01-10', 'Completado', 33200000.00),
    (502, 202, 105, '2024-01-15', 'Completado', 18600000.00),
    (503, 205, 104, '2024-02-01', 'Completado', 8200000.00),
    (504, 203, 106, '2024-02-12', 'Procesando', 2400000.00),
    (505, 204, 105, '2024-02-20', 'Completado', 13700000.00),
    (506, 201, 104, '2024-03-05', 'Completado', 25000000.00),
    (507, 206, 106, '2024-03-18', 'Pendiente', 3100000.00)
]
with open('dataset/pedidos.csv', 'w', newline='', encoding='utf-8') as f:
    w = csv.writer(f)
    w.writerow(['pedido_id', 'cliente_id', 'empleado_id', 'fecha_pedido', 'estado', 'total'])
    w.writerows(pedidos)

# 6. DETALLE_PEDIDOS
detalles = [
    (1001, 501, 301, 2, 12500000.00),
    (1002, 501, 302, 1, 8200000.00),
    (1003, 502, 303, 2, 4500000.00),
    (1004, 502, 304, 3, 3200000.00),
    (1005, 503, 302, 1, 8200000.00),
    (1006, 504, 305, 1, 2400000.00),
    (1007, 505, 301, 1, 12500000.00),
    (1008, 505, 306, 1, 1200000.00),
    (1009, 506, 301, 2, 12500000.00),
    (1010, 507, 304, 1, 3100000.00)
]
with open('dataset/detalle_pedidos.csv', 'w', newline='', encoding='utf-8') as f:
    w = csv.writer(f)
    w.writerow(['detalle_id', 'pedido_id', 'producto_id', 'cantidad', 'precio_unitario'])
    w.writerows(detalles)

print('SUCCESS: Todos los datasets CSV creados exitosamente en dataset/')
