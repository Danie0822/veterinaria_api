-- Crear la base de datos
CREATE DATABASE VeterinariaDB;

-- Usar la base de datos
\c VeterinariaDB;


-- Tabla de Tratamientos
CREATE TABLE Tratamientos (
    id SERIAL PRIMARY KEY,
    id_mascota INT,  -- Relación con la tabla Mascotas
    quien_asigno INT,  -- Relación con la tabla Usuarios (ID del usuario que asignó el tratamiento)
    fecha_inicio DATE,
    fecha_fin DATE,
    detalles TEXT,  -- Detalles del tratamiento
    FOREIGN KEY (id_mascota) REFERENCES Mascotas(id),
    FOREIGN KEY (quien_asigno) REFERENCES Usuarios(id)
);

-- Tabla de Medicamentos Asignados a Tratamientos (actualización)
CREATE TABLE MedicamentosTratamiento (
    id SERIAL PRIMARY KEY,
    id_tratamiento INT,  -- Relación con la tabla Tratamientos
    id_medicamento INT,  -- Relación con la tabla Medicamentos
    recomendacion TEXT,  -- Texto con la recomendación completa
    dosis VARCHAR(100),  -- Ejemplo: 1 tableta cada 8 horas
    cantidad INT,  -- Cantidad disponible del medicamento para ese tratamiento
    es_de_por_vida BOOLEAN DEFAULT FALSE,  -- Indica si el medicamento es de por vida
    fecha_fin DATE,  -- Fecha hasta cuando debe tomarse el medicamento, si no es de por vida
    FOREIGN KEY (id_tratamiento) REFERENCES Tratamientos(id),
    FOREIGN KEY (id_medicamento) REFERENCES Medicamentos(id)
);

-- Tabla de Historial Médico de las Mascotas
CREATE TABLE HistorialMedico (
    id SERIAL PRIMARY KEY,
    id_mascota INT,  -- Relación con la tabla Mascotas
    fecha_visita DATE,
    motivo TEXT,
    diagnostico TEXT,
    tratamiento TEXT,
    FOREIGN KEY (id_mascota) REFERENCES Mascotas(id)
);

-- Tabla de Citas Veterinarias (actualizada con estado y sin delete cascade)
CREATE TABLE Citas (
    id SERIAL PRIMARY KEY,
    id_mascota INT,  -- Relación con la tabla Mascotas
    fecha_cita DATE,
    hora TIME,
    descripcion TEXT,
    estado VARCHAR(20) DEFAULT 'Pendiente' CHECK (estado IN ('Pendiente', 'Confirmada', 'Cancelada', 'Realizada')),  -- Estado de la cita  
    FOREIGN KEY (id_mascota) REFERENCES Mascotas(id)
);
