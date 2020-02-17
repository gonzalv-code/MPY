--
-- PostgreSQL database dump
--

-- Dumped from database version 10.4
-- Dumped by pg_dump version 12.0

-- Started on 2020-02-11 10:43:36

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

--
-- TOC entry 213 (class 1259 OID 168022)
-- Name: aperturas_cierres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.aperturas_cierres (
    id_apertura_cierre integer NOT NULL,
    apertura_apertura_cierre timestamp without time zone NOT NULL,
    monto_apertura_cierre integer NOT NULL,
    cierre_apertura_cierre timestamp without time zone NOT NULL,
    id_usuario integer NOT NULL,
    id_caja integer NOT NULL
);


ALTER TABLE public.aperturas_cierres OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 168020)
-- Name: aperturas_cierres_id_apertura_cierre_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.aperturas_cierres_id_apertura_cierre_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.aperturas_cierres_id_apertura_cierre_seq OWNER TO postgres;

--
-- TOC entry 3169 (class 0 OID 0)
-- Dependencies: 212
-- Name: aperturas_cierres_id_apertura_cierre_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.aperturas_cierres_id_apertura_cierre_seq OWNED BY public.aperturas_cierres.id_apertura_cierre;


--
-- TOC entry 215 (class 1259 OID 168030)
-- Name: cajas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cajas (
    id_caja integer NOT NULL,
    nombre_caja character varying NOT NULL,
    id_sucursal integer NOT NULL
);


ALTER TABLE public.cajas OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 168028)
-- Name: cajas_id_caja_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cajas_id_caja_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cajas_id_caja_seq OWNER TO postgres;

--
-- TOC entry 3170 (class 0 OID 0)
-- Dependencies: 214
-- Name: cajas_id_caja_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cajas_id_caja_seq OWNED BY public.cajas.id_caja;


--
-- TOC entry 217 (class 1259 OID 168041)
-- Name: cargos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cargos (
    id_cargo integer NOT NULL,
    nombre_cargo character varying NOT NULL
);


ALTER TABLE public.cargos OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 168039)
-- Name: cargos_id_cargo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cargos_id_cargo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cargos_id_cargo_seq OWNER TO postgres;

--
-- TOC entry 3171 (class 0 OID 0)
-- Dependencies: 216
-- Name: cargos_id_cargo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cargos_id_cargo_seq OWNED BY public.cargos.id_cargo;


--
-- TOC entry 219 (class 1259 OID 168052)
-- Name: ciudades; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ciudades (
    id_ciudad integer NOT NULL,
    nombre_ciudad character varying NOT NULL
);


ALTER TABLE public.ciudades OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 168050)
-- Name: ciudades_id_ciudad_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ciudades_id_ciudad_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ciudades_id_ciudad_seq OWNER TO postgres;

--
-- TOC entry 3172 (class 0 OID 0)
-- Dependencies: 218
-- Name: ciudades_id_ciudad_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ciudades_id_ciudad_seq OWNED BY public.ciudades.id_ciudad;


--
-- TOC entry 221 (class 1259 OID 168063)
-- Name: clientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clientes (
    id_cliente integer NOT NULL,
    ruc_cliente character varying NOT NULL,
    id_persona integer NOT NULL,
    estado_cliente character varying NOT NULL
);


ALTER TABLE public.clientes OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 168061)
-- Name: clientes_id_cliente_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clientes_id_cliente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clientes_id_cliente_seq OWNER TO postgres;

--
-- TOC entry 3173 (class 0 OID 0)
-- Dependencies: 220
-- Name: clientes_id_cliente_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clientes_id_cliente_seq OWNED BY public.clientes.id_cliente;


--
-- TOC entry 223 (class 1259 OID 168074)
-- Name: cobros_cabeceras; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cobros_cabeceras (
    id_cobro_cabecera integer NOT NULL,
    fecha_cobro_cabecera timestamp without time zone NOT NULL,
    recibo_cobro_cabecera character varying NOT NULL,
    id_usuario integer NOT NULL,
    id_sucursal integer NOT NULL,
    id_apertura_cierre integer NOT NULL,
    estado_cobro_cabecera character varying NOT NULL
);


ALTER TABLE public.cobros_cabeceras OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 168072)
-- Name: cobros_cabeceras_id_cobro_cabecera_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cobros_cabeceras_id_cobro_cabecera_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cobros_cabeceras_id_cobro_cabecera_seq OWNER TO postgres;

--
-- TOC entry 3174 (class 0 OID 0)
-- Dependencies: 222
-- Name: cobros_cabeceras_id_cobro_cabecera_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cobros_cabeceras_id_cobro_cabecera_seq OWNED BY public.cobros_cabeceras.id_cobro_cabecera;


--
-- TOC entry 227 (class 1259 OID 168096)
-- Name: cobros_detalles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cobros_detalles (
    id_cobro_detalle integer NOT NULL,
    id_cobro_cabecera integer NOT NULL,
    id_venta_cuota integer NOT NULL,
    monto_cobro_detalle integer NOT NULL
);


ALTER TABLE public.cobros_detalles OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 168094)
-- Name: cobros_detalles_id_cobro_detalle_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cobros_detalles_id_cobro_detalle_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cobros_detalles_id_cobro_detalle_seq OWNER TO postgres;

--
-- TOC entry 3175 (class 0 OID 0)
-- Dependencies: 226
-- Name: cobros_detalles_id_cobro_detalle_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cobros_detalles_id_cobro_detalle_seq OWNED BY public.cobros_detalles.id_cobro_detalle;


--
-- TOC entry 225 (class 1259 OID 168085)
-- Name: cobros_formas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cobros_formas (
    id_cobro_forma integer NOT NULL,
    id_cobro_cabecera integer NOT NULL,
    forma_cobro_forma character varying NOT NULL,
    id_entidad integer NOT NULL,
    id_tarjeta integer NOT NULL,
    cuenta_cobro_forma character varying NOT NULL,
    monto_cobro_forma integer NOT NULL
);


ALTER TABLE public.cobros_formas OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 168083)
-- Name: cobros_formas_id_cobro_forma_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cobros_formas_id_cobro_forma_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cobros_formas_id_cobro_forma_seq OWNER TO postgres;

--
-- TOC entry 3176 (class 0 OID 0)
-- Dependencies: 224
-- Name: cobros_formas_id_cobro_forma_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cobros_formas_id_cobro_forma_seq OWNED BY public.cobros_formas.id_cobro_forma;


--
-- TOC entry 251 (class 1259 OID 168232)
-- Name: compras_cabeceras; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.compras_cabeceras (
    id_compra_cabecera integer NOT NULL,
    fiscal_compra_cabecera character varying NOT NULL,
    emision_compra_cabecera date NOT NULL,
    condicion_compra_cabecera character varying NOT NULL,
    cuotas_compra_cabecera integer DEFAULT 0 NOT NULL,
    intervalo_compra_cabecera integer DEFAULT 0 NOT NULL,
    id_usuario integer DEFAULT 0 NOT NULL,
    id_sucursal integer DEFAULT 0 NOT NULL,
    id_proveedor integer DEFAULT 0 NOT NULL,
    registro_compra_cabecera timestamp without time zone DEFAULT now()
);


ALTER TABLE public.compras_cabeceras OWNER TO postgres;

--
-- TOC entry 250 (class 1259 OID 168230)
-- Name: compras_cabeceras_id_compra_cabecera_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.compras_cabeceras_id_compra_cabecera_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.compras_cabeceras_id_compra_cabecera_seq OWNER TO postgres;

--
-- TOC entry 3177 (class 0 OID 0)
-- Dependencies: 250
-- Name: compras_cabeceras_id_compra_cabecera_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.compras_cabeceras_id_compra_cabecera_seq OWNED BY public.compras_cabeceras.id_compra_cabecera;


--
-- TOC entry 255 (class 1259 OID 168257)
-- Name: compras_cuotas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.compras_cuotas (
    id_compra_cuota integer NOT NULL,
    id_compra_cabecera integer NOT NULL,
    cuota_compra_cuota integer NOT NULL,
    de_compra_cuota integer NOT NULL,
    monto_compra_cuota integer NOT NULL
);


ALTER TABLE public.compras_cuotas OWNER TO postgres;

--
-- TOC entry 254 (class 1259 OID 168255)
-- Name: compras_cuotas_id_compra_cuota_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.compras_cuotas_id_compra_cuota_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.compras_cuotas_id_compra_cuota_seq OWNER TO postgres;

--
-- TOC entry 3178 (class 0 OID 0)
-- Dependencies: 254
-- Name: compras_cuotas_id_compra_cuota_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.compras_cuotas_id_compra_cuota_seq OWNED BY public.compras_cuotas.id_compra_cuota;


--
-- TOC entry 253 (class 1259 OID 168249)
-- Name: compras_detalles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.compras_detalles (
    id_compra_detalle integer NOT NULL,
    id_compra_cabecera integer NOT NULL,
    id_item integer NOT NULL,
    cantidad_compra_detalle integer NOT NULL,
    precio_compra_detalle integer NOT NULL,
    id_iva integer NOT NULL
);


ALTER TABLE public.compras_detalles OWNER TO postgres;

--
-- TOC entry 252 (class 1259 OID 168247)
-- Name: compras_detalles_id_compra_detalle_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.compras_detalles_id_compra_detalle_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.compras_detalles_id_compra_detalle_seq OWNER TO postgres;

--
-- TOC entry 3179 (class 0 OID 0)
-- Dependencies: 252
-- Name: compras_detalles_id_compra_detalle_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.compras_detalles_id_compra_detalle_seq OWNED BY public.compras_detalles.id_compra_detalle;


--
-- TOC entry 229 (class 1259 OID 168104)
-- Name: depositos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.depositos (
    id_deposito integer NOT NULL,
    nombre_deposito character varying NOT NULL,
    id_sucursal integer NOT NULL
);


ALTER TABLE public.depositos OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 168102)
-- Name: depositos_id_deposito_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.depositos_id_deposito_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.depositos_id_deposito_seq OWNER TO postgres;

--
-- TOC entry 3180 (class 0 OID 0)
-- Dependencies: 228
-- Name: depositos_id_deposito_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.depositos_id_deposito_seq OWNED BY public.depositos.id_deposito;


--
-- TOC entry 231 (class 1259 OID 168116)
-- Name: entidades; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.entidades (
    id_entidad integer NOT NULL,
    nombre_entidad character varying NOT NULL
);


ALTER TABLE public.entidades OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 168114)
-- Name: entidades_id_entidad_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.entidades_id_entidad_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.entidades_id_entidad_seq OWNER TO postgres;

--
-- TOC entry 3181 (class 0 OID 0)
-- Dependencies: 230
-- Name: entidades_id_entidad_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.entidades_id_entidad_seq OWNED BY public.entidades.id_entidad;


--
-- TOC entry 233 (class 1259 OID 168127)
-- Name: estados_civiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estados_civiles (
    id_estado_civil integer NOT NULL,
    nombre_estado_civil character varying NOT NULL
);


ALTER TABLE public.estados_civiles OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 168125)
-- Name: estados_civiles_id_estado_civil_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.estados_civiles_id_estado_civil_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.estados_civiles_id_estado_civil_seq OWNER TO postgres;

--
-- TOC entry 3182 (class 0 OID 0)
-- Dependencies: 232
-- Name: estados_civiles_id_estado_civil_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.estados_civiles_id_estado_civil_seq OWNED BY public.estados_civiles.id_estado_civil;


--
-- TOC entry 205 (class 1259 OID 151611)
-- Name: formularios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.formularios (
    id_formulario integer NOT NULL,
    nombre_formulario character varying NOT NULL,
    url_formulario character varying NOT NULL,
    id_menu integer NOT NULL
);


ALTER TABLE public.formularios OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 151609)
-- Name: formularios_id_formulario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.formularios_id_formulario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.formularios_id_formulario_seq OWNER TO postgres;

--
-- TOC entry 3183 (class 0 OID 0)
-- Dependencies: 204
-- Name: formularios_id_formulario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.formularios_id_formulario_seq OWNED BY public.formularios.id_formulario;


--
-- TOC entry 235 (class 1259 OID 168140)
-- Name: funcionarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.funcionarios (
    id_funcionario integer NOT NULL,
    alta_funcionario timestamp without time zone NOT NULL,
    id_cargo integer NOT NULL,
    id_persona integer NOT NULL,
    estado_funcionario character varying NOT NULL
);


ALTER TABLE public.funcionarios OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 168138)
-- Name: funcionarios_id_funcionario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.funcionarios_id_funcionario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.funcionarios_id_funcionario_seq OWNER TO postgres;

--
-- TOC entry 3184 (class 0 OID 0)
-- Dependencies: 234
-- Name: funcionarios_id_funcionario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.funcionarios_id_funcionario_seq OWNED BY public.funcionarios.id_funcionario;


--
-- TOC entry 249 (class 1259 OID 168217)
-- Name: items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.items (
    id_item integer NOT NULL,
    nombre_item character varying NOT NULL,
    precio_item integer NOT NULL,
    id_iva integer,
    tipo_item character varying NOT NULL,
    id_modelo integer NOT NULL
);


ALTER TABLE public.items OWNER TO postgres;

--
-- TOC entry 248 (class 1259 OID 168215)
-- Name: items_id_item_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.items_id_item_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.items_id_item_seq OWNER TO postgres;

--
-- TOC entry 3185 (class 0 OID 0)
-- Dependencies: 248
-- Name: items_id_item_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.items_id_item_seq OWNED BY public.items.id_item;


--
-- TOC entry 211 (class 1259 OID 159844)
-- Name: ivas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ivas (
    id_iva integer NOT NULL,
    nombre_iva character varying NOT NULL,
    porcentaje_iva numeric(4,2) NOT NULL
);


ALTER TABLE public.ivas OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 159842)
-- Name: ivas_id_iva_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ivas_id_iva_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ivas_id_iva_seq OWNER TO postgres;

--
-- TOC entry 3186 (class 0 OID 0)
-- Dependencies: 210
-- Name: ivas_id_iva_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ivas_id_iva_seq OWNED BY public.ivas.id_iva;


--
-- TOC entry 237 (class 1259 OID 168151)
-- Name: marcas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.marcas (
    id_marca integer NOT NULL,
    nombre_marca character varying NOT NULL
);


ALTER TABLE public.marcas OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 168149)
-- Name: marcas_id_marca_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.marcas_id_marca_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.marcas_id_marca_seq OWNER TO postgres;

--
-- TOC entry 3187 (class 0 OID 0)
-- Dependencies: 236
-- Name: marcas_id_marca_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.marcas_id_marca_seq OWNED BY public.marcas.id_marca;


--
-- TOC entry 203 (class 1259 OID 151600)
-- Name: menus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.menus (
    id_menu integer NOT NULL,
    nombre_menu character varying NOT NULL
);


ALTER TABLE public.menus OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 151598)
-- Name: menus_id_menu_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.menus_id_menu_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.menus_id_menu_seq OWNER TO postgres;

--
-- TOC entry 3188 (class 0 OID 0)
-- Dependencies: 202
-- Name: menus_id_menu_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.menus_id_menu_seq OWNED BY public.menus.id_menu;


--
-- TOC entry 239 (class 1259 OID 168162)
-- Name: modelos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.modelos (
    id_modelo integer NOT NULL,
    nombre_modelo character varying NOT NULL,
    serial_modelo character varying NOT NULL,
    id_marca integer NOT NULL
);


ALTER TABLE public.modelos OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 168160)
-- Name: modelos_id_modelo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.modelos_id_modelo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.modelos_id_modelo_seq OWNER TO postgres;

--
-- TOC entry 3189 (class 0 OID 0)
-- Dependencies: 238
-- Name: modelos_id_modelo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.modelos_id_modelo_seq OWNED BY public.modelos.id_modelo;


--
-- TOC entry 241 (class 1259 OID 168173)
-- Name: nacionalidades; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nacionalidades (
    id_nacionalidad integer NOT NULL,
    nombre_nacionalidad character varying NOT NULL
);


ALTER TABLE public.nacionalidades OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 168171)
-- Name: nacionalidades_id_nacionalidad_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nacionalidades_id_nacionalidad_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nacionalidades_id_nacionalidad_seq OWNER TO postgres;

--
-- TOC entry 3190 (class 0 OID 0)
-- Dependencies: 240
-- Name: nacionalidades_id_nacionalidad_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nacionalidades_id_nacionalidad_seq OWNED BY public.nacionalidades.id_nacionalidad;


--
-- TOC entry 199 (class 1259 OID 151567)
-- Name: perfiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.perfiles (
    id_perfil integer NOT NULL,
    nombre_perfil character varying NOT NULL
);


ALTER TABLE public.perfiles OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 151565)
-- Name: perfiles_id_perfil_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.perfiles_id_perfil_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.perfiles_id_perfil_seq OWNER TO postgres;

--
-- TOC entry 3191 (class 0 OID 0)
-- Dependencies: 198
-- Name: perfiles_id_perfil_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.perfiles_id_perfil_seq OWNED BY public.perfiles.id_perfil;


--
-- TOC entry 243 (class 1259 OID 168184)
-- Name: personas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.personas (
    id_persona integer NOT NULL,
    nombre_persona character varying NOT NULL,
    apellido_persona character varying NOT NULL,
    cedula_persona character varying NOT NULL,
    telefono_persona character varying NOT NULL,
    direccion_persona character varying NOT NULL,
    nacimiento_persona timestamp without time zone NOT NULL,
    id_estado_civil integer NOT NULL,
    id_nacionalidad integer NOT NULL,
    id_ciudad integer NOT NULL,
    estado_persona character varying NOT NULL
);


ALTER TABLE public.personas OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 168182)
-- Name: personas_id_persona_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.personas_id_persona_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.personas_id_persona_seq OWNER TO postgres;

--
-- TOC entry 3192 (class 0 OID 0)
-- Dependencies: 242
-- Name: personas_id_persona_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.personas_id_persona_seq OWNED BY public.personas.id_persona;


--
-- TOC entry 245 (class 1259 OID 168195)
-- Name: proveedores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.proveedores (
    id_proveedor integer NOT NULL,
    id_persona integer NOT NULL,
    estado_proveedor character varying NOT NULL
);


ALTER TABLE public.proveedores OWNER TO postgres;

--
-- TOC entry 244 (class 1259 OID 168193)
-- Name: proveedores_id_proveedor_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.proveedores_id_proveedor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.proveedores_id_proveedor_seq OWNER TO postgres;

--
-- TOC entry 3193 (class 0 OID 0)
-- Dependencies: 244
-- Name: proveedores_id_proveedor_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.proveedores_id_proveedor_seq OWNED BY public.proveedores.id_proveedor;


--
-- TOC entry 201 (class 1259 OID 151589)
-- Name: sucursales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sucursales (
    id_sucursal integer NOT NULL,
    nombre_sucursal character varying NOT NULL,
    direccion_sucursal character varying NOT NULL,
    telefono_sucursal character varying NOT NULL
);


ALTER TABLE public.sucursales OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 151587)
-- Name: sucursales_id_sucursal_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sucursales_id_sucursal_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sucursales_id_sucursal_seq OWNER TO postgres;

--
-- TOC entry 3194 (class 0 OID 0)
-- Dependencies: 200
-- Name: sucursales_id_sucursal_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sucursales_id_sucursal_seq OWNED BY public.sucursales.id_sucursal;


--
-- TOC entry 247 (class 1259 OID 168206)
-- Name: tarjetas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tarjetas (
    id_tarjeta integer NOT NULL,
    nombre_tarjeta character varying NOT NULL
);


ALTER TABLE public.tarjetas OWNER TO postgres;

--
-- TOC entry 246 (class 1259 OID 168204)
-- Name: tarjetas_id_tarjeta_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tarjetas_id_tarjeta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tarjetas_id_tarjeta_seq OWNER TO postgres;

--
-- TOC entry 3195 (class 0 OID 0)
-- Dependencies: 246
-- Name: tarjetas_id_tarjeta_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tarjetas_id_tarjeta_seq OWNED BY public.tarjetas.id_tarjeta;


--
-- TOC entry 197 (class 1259 OID 151556)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    login_usuario character varying NOT NULL,
    id_perfil integer NOT NULL,
    clave_usuario character varying NOT NULL,
    estado_usuario character varying NOT NULL,
    id_funcionario integer NOT NULL,
    id_sucursal integer NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 151554)
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuarios_id_usuario_seq OWNER TO postgres;

--
-- TOC entry 3196 (class 0 OID 0)
-- Dependencies: 196
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;


--
-- TOC entry 207 (class 1259 OID 159792)
-- Name: ventas_cabeceras; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ventas_cabeceras (
    id_venta_cabecera integer NOT NULL,
    fiscal_venta_cabecera character varying NOT NULL,
    emision_venta_cabecera date NOT NULL,
    condicion_venta_cabecera character varying NOT NULL,
    cuotas_venta_cabecera integer DEFAULT 0 NOT NULL,
    intervalo_venta_cabecera integer DEFAULT 0 NOT NULL,
    id_usuario integer DEFAULT 0 NOT NULL,
    id_apertura_cierre integer DEFAULT 0 NOT NULL,
    id_sucursal integer DEFAULT 0 NOT NULL,
    id_cliente integer DEFAULT 0 NOT NULL,
    registro_venta_cabecera timestamp without time zone DEFAULT now()
);


ALTER TABLE public.ventas_cabeceras OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 159790)
-- Name: ventas_cabeceras_id_venta_cabecera_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ventas_cabeceras_id_venta_cabecera_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ventas_cabeceras_id_venta_cabecera_seq OWNER TO postgres;

--
-- TOC entry 3197 (class 0 OID 0)
-- Dependencies: 206
-- Name: ventas_cabeceras_id_venta_cabecera_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ventas_cabeceras_id_venta_cabecera_seq OWNED BY public.ventas_cabeceras.id_venta_cabecera;


--
-- TOC entry 257 (class 1259 OID 168265)
-- Name: ventas_cuotas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ventas_cuotas (
    id_venta_cuota integer NOT NULL,
    id_venta_cabecera integer NOT NULL,
    cuota_venta_cuota integer NOT NULL,
    de_venta_cuota integer NOT NULL,
    monto_venta_cuota integer NOT NULL
);


ALTER TABLE public.ventas_cuotas OWNER TO postgres;

--
-- TOC entry 256 (class 1259 OID 168263)
-- Name: ventas_cuotas_id_venta_cuota_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ventas_cuotas_id_venta_cuota_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ventas_cuotas_id_venta_cuota_seq OWNER TO postgres;

--
-- TOC entry 3198 (class 0 OID 0)
-- Dependencies: 256
-- Name: ventas_cuotas_id_venta_cuota_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ventas_cuotas_id_venta_cuota_seq OWNED BY public.ventas_cuotas.id_venta_cuota;


--
-- TOC entry 209 (class 1259 OID 159803)
-- Name: ventas_detalles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ventas_detalles (
    id_venta_detalle integer NOT NULL,
    id_venta_cabecera integer NOT NULL,
    id_item integer NOT NULL,
    cantidad_venta_detalle integer NOT NULL,
    precio_venta_detalle integer NOT NULL,
    id_iva integer NOT NULL
);


ALTER TABLE public.ventas_detalles OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 159801)
-- Name: ventas_detalles_id_venta_detalle_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ventas_detalles_id_venta_detalle_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ventas_detalles_id_venta_detalle_seq OWNER TO postgres;

--
-- TOC entry 3199 (class 0 OID 0)
-- Dependencies: 208
-- Name: ventas_detalles_id_venta_detalle_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ventas_detalles_id_venta_detalle_seq OWNED BY public.ventas_detalles.id_venta_detalle;


--
-- TOC entry 2890 (class 2604 OID 168025)
-- Name: aperturas_cierres id_apertura_cierre; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aperturas_cierres ALTER COLUMN id_apertura_cierre SET DEFAULT nextval('public.aperturas_cierres_id_apertura_cierre_seq'::regclass);


--
-- TOC entry 2891 (class 2604 OID 168033)
-- Name: cajas id_caja; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cajas ALTER COLUMN id_caja SET DEFAULT nextval('public.cajas_id_caja_seq'::regclass);


--
-- TOC entry 2892 (class 2604 OID 168044)
-- Name: cargos id_cargo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargos ALTER COLUMN id_cargo SET DEFAULT nextval('public.cargos_id_cargo_seq'::regclass);


--
-- TOC entry 2893 (class 2604 OID 168055)
-- Name: ciudades id_ciudad; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ciudades ALTER COLUMN id_ciudad SET DEFAULT nextval('public.ciudades_id_ciudad_seq'::regclass);


--
-- TOC entry 2894 (class 2604 OID 168066)
-- Name: clientes id_cliente; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes ALTER COLUMN id_cliente SET DEFAULT nextval('public.clientes_id_cliente_seq'::regclass);


--
-- TOC entry 2895 (class 2604 OID 168077)
-- Name: cobros_cabeceras id_cobro_cabecera; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cobros_cabeceras ALTER COLUMN id_cobro_cabecera SET DEFAULT nextval('public.cobros_cabeceras_id_cobro_cabecera_seq'::regclass);


--
-- TOC entry 2897 (class 2604 OID 168099)
-- Name: cobros_detalles id_cobro_detalle; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cobros_detalles ALTER COLUMN id_cobro_detalle SET DEFAULT nextval('public.cobros_detalles_id_cobro_detalle_seq'::regclass);


--
-- TOC entry 2896 (class 2604 OID 168088)
-- Name: cobros_formas id_cobro_forma; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cobros_formas ALTER COLUMN id_cobro_forma SET DEFAULT nextval('public.cobros_formas_id_cobro_forma_seq'::regclass);


--
-- TOC entry 2909 (class 2604 OID 168235)
-- Name: compras_cabeceras id_compra_cabecera; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compras_cabeceras ALTER COLUMN id_compra_cabecera SET DEFAULT nextval('public.compras_cabeceras_id_compra_cabecera_seq'::regclass);


--
-- TOC entry 2917 (class 2604 OID 168260)
-- Name: compras_cuotas id_compra_cuota; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compras_cuotas ALTER COLUMN id_compra_cuota SET DEFAULT nextval('public.compras_cuotas_id_compra_cuota_seq'::regclass);


--
-- TOC entry 2916 (class 2604 OID 168252)
-- Name: compras_detalles id_compra_detalle; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compras_detalles ALTER COLUMN id_compra_detalle SET DEFAULT nextval('public.compras_detalles_id_compra_detalle_seq'::regclass);


--
-- TOC entry 2898 (class 2604 OID 168107)
-- Name: depositos id_deposito; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.depositos ALTER COLUMN id_deposito SET DEFAULT nextval('public.depositos_id_deposito_seq'::regclass);


--
-- TOC entry 2899 (class 2604 OID 168119)
-- Name: entidades id_entidad; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entidades ALTER COLUMN id_entidad SET DEFAULT nextval('public.entidades_id_entidad_seq'::regclass);


--
-- TOC entry 2900 (class 2604 OID 168130)
-- Name: estados_civiles id_estado_civil; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estados_civiles ALTER COLUMN id_estado_civil SET DEFAULT nextval('public.estados_civiles_id_estado_civil_seq'::regclass);


--
-- TOC entry 2879 (class 2604 OID 151614)
-- Name: formularios id_formulario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.formularios ALTER COLUMN id_formulario SET DEFAULT nextval('public.formularios_id_formulario_seq'::regclass);


--
-- TOC entry 2901 (class 2604 OID 168143)
-- Name: funcionarios id_funcionario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.funcionarios ALTER COLUMN id_funcionario SET DEFAULT nextval('public.funcionarios_id_funcionario_seq'::regclass);


--
-- TOC entry 2908 (class 2604 OID 168220)
-- Name: items id_item; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items ALTER COLUMN id_item SET DEFAULT nextval('public.items_id_item_seq'::regclass);


--
-- TOC entry 2889 (class 2604 OID 159847)
-- Name: ivas id_iva; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ivas ALTER COLUMN id_iva SET DEFAULT nextval('public.ivas_id_iva_seq'::regclass);


--
-- TOC entry 2902 (class 2604 OID 168154)
-- Name: marcas id_marca; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marcas ALTER COLUMN id_marca SET DEFAULT nextval('public.marcas_id_marca_seq'::regclass);


--
-- TOC entry 2878 (class 2604 OID 151603)
-- Name: menus id_menu; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menus ALTER COLUMN id_menu SET DEFAULT nextval('public.menus_id_menu_seq'::regclass);


--
-- TOC entry 2903 (class 2604 OID 168165)
-- Name: modelos id_modelo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modelos ALTER COLUMN id_modelo SET DEFAULT nextval('public.modelos_id_modelo_seq'::regclass);


--
-- TOC entry 2904 (class 2604 OID 168176)
-- Name: nacionalidades id_nacionalidad; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nacionalidades ALTER COLUMN id_nacionalidad SET DEFAULT nextval('public.nacionalidades_id_nacionalidad_seq'::regclass);


--
-- TOC entry 2876 (class 2604 OID 151570)
-- Name: perfiles id_perfil; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfiles ALTER COLUMN id_perfil SET DEFAULT nextval('public.perfiles_id_perfil_seq'::regclass);


--
-- TOC entry 2905 (class 2604 OID 168187)
-- Name: personas id_persona; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personas ALTER COLUMN id_persona SET DEFAULT nextval('public.personas_id_persona_seq'::regclass);


--
-- TOC entry 2906 (class 2604 OID 168198)
-- Name: proveedores id_proveedor; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedores ALTER COLUMN id_proveedor SET DEFAULT nextval('public.proveedores_id_proveedor_seq'::regclass);


--
-- TOC entry 2877 (class 2604 OID 151592)
-- Name: sucursales id_sucursal; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sucursales ALTER COLUMN id_sucursal SET DEFAULT nextval('public.sucursales_id_sucursal_seq'::regclass);


--
-- TOC entry 2907 (class 2604 OID 168209)
-- Name: tarjetas id_tarjeta; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tarjetas ALTER COLUMN id_tarjeta SET DEFAULT nextval('public.tarjetas_id_tarjeta_seq'::regclass);


--
-- TOC entry 2875 (class 2604 OID 151559)
-- Name: usuarios id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);


--
-- TOC entry 2880 (class 2604 OID 159795)
-- Name: ventas_cabeceras id_venta_cabecera; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas_cabeceras ALTER COLUMN id_venta_cabecera SET DEFAULT nextval('public.ventas_cabeceras_id_venta_cabecera_seq'::regclass);


--
-- TOC entry 2918 (class 2604 OID 168268)
-- Name: ventas_cuotas id_venta_cuota; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas_cuotas ALTER COLUMN id_venta_cuota SET DEFAULT nextval('public.ventas_cuotas_id_venta_cuota_seq'::regclass);


--
-- TOC entry 2888 (class 2604 OID 159806)
-- Name: ventas_detalles id_venta_detalle; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas_detalles ALTER COLUMN id_venta_detalle SET DEFAULT nextval('public.ventas_detalles_id_venta_detalle_seq'::regclass);


--
-- TOC entry 3119 (class 0 OID 168022)
-- Dependencies: 213
-- Data for Name: aperturas_cierres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.aperturas_cierres (id_apertura_cierre, apertura_apertura_cierre, monto_apertura_cierre, cierre_apertura_cierre, id_usuario, id_caja) FROM stdin;
\.


--
-- TOC entry 3121 (class 0 OID 168030)
-- Dependencies: 215
-- Data for Name: cajas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cajas (id_caja, nombre_caja, id_sucursal) FROM stdin;
\.


--
-- TOC entry 3123 (class 0 OID 168041)
-- Dependencies: 217
-- Data for Name: cargos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cargos (id_cargo, nombre_cargo) FROM stdin;
\.


--
-- TOC entry 3125 (class 0 OID 168052)
-- Dependencies: 219
-- Data for Name: ciudades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ciudades (id_ciudad, nombre_ciudad) FROM stdin;
\.


--
-- TOC entry 3127 (class 0 OID 168063)
-- Dependencies: 221
-- Data for Name: clientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clientes (id_cliente, ruc_cliente, id_persona, estado_cliente) FROM stdin;
\.


--
-- TOC entry 3129 (class 0 OID 168074)
-- Dependencies: 223
-- Data for Name: cobros_cabeceras; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cobros_cabeceras (id_cobro_cabecera, fecha_cobro_cabecera, recibo_cobro_cabecera, id_usuario, id_sucursal, id_apertura_cierre, estado_cobro_cabecera) FROM stdin;
\.


--
-- TOC entry 3133 (class 0 OID 168096)
-- Dependencies: 227
-- Data for Name: cobros_detalles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cobros_detalles (id_cobro_detalle, id_cobro_cabecera, id_venta_cuota, monto_cobro_detalle) FROM stdin;
\.


--
-- TOC entry 3131 (class 0 OID 168085)
-- Dependencies: 225
-- Data for Name: cobros_formas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cobros_formas (id_cobro_forma, id_cobro_cabecera, forma_cobro_forma, id_entidad, id_tarjeta, cuenta_cobro_forma, monto_cobro_forma) FROM stdin;
\.


--
-- TOC entry 3157 (class 0 OID 168232)
-- Dependencies: 251
-- Data for Name: compras_cabeceras; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.compras_cabeceras (id_compra_cabecera, fiscal_compra_cabecera, emision_compra_cabecera, condicion_compra_cabecera, cuotas_compra_cabecera, intervalo_compra_cabecera, id_usuario, id_sucursal, id_proveedor, registro_compra_cabecera) FROM stdin;
\.


--
-- TOC entry 3161 (class 0 OID 168257)
-- Dependencies: 255
-- Data for Name: compras_cuotas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.compras_cuotas (id_compra_cuota, id_compra_cabecera, cuota_compra_cuota, de_compra_cuota, monto_compra_cuota) FROM stdin;
\.


--
-- TOC entry 3159 (class 0 OID 168249)
-- Dependencies: 253
-- Data for Name: compras_detalles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.compras_detalles (id_compra_detalle, id_compra_cabecera, id_item, cantidad_compra_detalle, precio_compra_detalle, id_iva) FROM stdin;
\.


--
-- TOC entry 3135 (class 0 OID 168104)
-- Dependencies: 229
-- Data for Name: depositos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.depositos (id_deposito, nombre_deposito, id_sucursal) FROM stdin;
\.


--
-- TOC entry 3137 (class 0 OID 168116)
-- Dependencies: 231
-- Data for Name: entidades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.entidades (id_entidad, nombre_entidad) FROM stdin;
\.


--
-- TOC entry 3139 (class 0 OID 168127)
-- Dependencies: 233
-- Data for Name: estados_civiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estados_civiles (id_estado_civil, nombre_estado_civil) FROM stdin;
\.


--
-- TOC entry 3111 (class 0 OID 151611)
-- Dependencies: 205
-- Data for Name: formularios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.formularios (id_formulario, nombre_formulario, url_formulario, id_menu) FROM stdin;
2	Clientes	frm/referenciales/clientes/index.html	1
3	Proveedores	frm/referenciales/proveedores/index.html	1
1	Productos xxxx	frm/referenciales/productos/index.html	1
4	Usuarios	frm/mantenimientos/usuarios/index.html	6
\.


--
-- TOC entry 3141 (class 0 OID 168140)
-- Dependencies: 235
-- Data for Name: funcionarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.funcionarios (id_funcionario, alta_funcionario, id_cargo, id_persona, estado_funcionario) FROM stdin;
\.


--
-- TOC entry 3155 (class 0 OID 168217)
-- Dependencies: 249
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.items (id_item, nombre_item, precio_item, id_iva, tipo_item, id_modelo) FROM stdin;
\.


--
-- TOC entry 3117 (class 0 OID 159844)
-- Dependencies: 211
-- Data for Name: ivas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ivas (id_iva, nombre_iva, porcentaje_iva) FROM stdin;
1	Exento	0.00
2	5%	5.00
3	10%	10.00
\.


--
-- TOC entry 3143 (class 0 OID 168151)
-- Dependencies: 237
-- Data for Name: marcas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marcas (id_marca, nombre_marca) FROM stdin;
\.


--
-- TOC entry 3109 (class 0 OID 151600)
-- Dependencies: 203
-- Data for Name: menus; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.menus (id_menu, nombre_menu) FROM stdin;
1	Referenciales
3	Consultas
4	Listados
5	Informes
6	Mantenimientos
2	Movimientos
\.


--
-- TOC entry 3145 (class 0 OID 168162)
-- Dependencies: 239
-- Data for Name: modelos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.modelos (id_modelo, nombre_modelo, serial_modelo, id_marca) FROM stdin;
\.


--
-- TOC entry 3147 (class 0 OID 168173)
-- Dependencies: 241
-- Data for Name: nacionalidades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nacionalidades (id_nacionalidad, nombre_nacionalidad) FROM stdin;
\.


--
-- TOC entry 3105 (class 0 OID 151567)
-- Dependencies: 199
-- Data for Name: perfiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.perfiles (id_perfil, nombre_perfil) FROM stdin;
1	Administradores
2	Informatica
4	nUEVO
\.


--
-- TOC entry 3149 (class 0 OID 168184)
-- Dependencies: 243
-- Data for Name: personas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.personas (id_persona, nombre_persona, apellido_persona, cedula_persona, telefono_persona, direccion_persona, nacimiento_persona, id_estado_civil, id_nacionalidad, id_ciudad, estado_persona) FROM stdin;
\.


--
-- TOC entry 3151 (class 0 OID 168195)
-- Dependencies: 245
-- Data for Name: proveedores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.proveedores (id_proveedor, id_persona, estado_proveedor) FROM stdin;
\.


--
-- TOC entry 3107 (class 0 OID 151589)
-- Dependencies: 201
-- Data for Name: sucursales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sucursales (id_sucursal, nombre_sucursal, direccion_sucursal, telefono_sucursal) FROM stdin;
\.


--
-- TOC entry 3153 (class 0 OID 168206)
-- Dependencies: 247
-- Data for Name: tarjetas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tarjetas (id_tarjeta, nombre_tarjeta) FROM stdin;
\.


--
-- TOC entry 3103 (class 0 OID 151556)
-- Dependencies: 197
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id_usuario, login_usuario, id_perfil, clave_usuario, estado_usuario, id_funcionario, id_sucursal) FROM stdin;
1	victor	1	1	A	1	1
2	miguel	2	2	A	2	1
\.


--
-- TOC entry 3113 (class 0 OID 159792)
-- Dependencies: 207
-- Data for Name: ventas_cabeceras; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_cabeceras (id_venta_cabecera, fiscal_venta_cabecera, emision_venta_cabecera, condicion_venta_cabecera, cuotas_venta_cabecera, intervalo_venta_cabecera, id_usuario, id_apertura_cierre, id_sucursal, id_cliente, registro_venta_cabecera) FROM stdin;
2	001-001-0000001	2020-01-20	2	0	0	1	1	1	1	2020-01-20 15:10:20
6	001-001-0003334	2020-01-27	2	0	0	0	0	0	1	2020-01-27 20:43:58.157986
7	001-001-0000005	2020-01-27	1	0	0	0	0	0	2	2020-01-27 22:05:10.589306
8	001-001-0000006	2020-02-04	1	0	0	0	0	0	1	2020-02-04 19:21:10.149226
\.


--
-- TOC entry 3163 (class 0 OID 168265)
-- Dependencies: 257
-- Data for Name: ventas_cuotas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_cuotas (id_venta_cuota, id_venta_cabecera, cuota_venta_cuota, de_venta_cuota, monto_venta_cuota) FROM stdin;
\.


--
-- TOC entry 3115 (class 0 OID 159803)
-- Dependencies: 209
-- Data for Name: ventas_detalles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas_detalles (id_venta_detalle, id_venta_cabecera, id_item, cantidad_venta_detalle, precio_venta_detalle, id_iva) FROM stdin;
1	2	2	15	1000	1
4	8	2	3	2000	3
3	2	1	27	500	2
\.


--
-- TOC entry 3200 (class 0 OID 0)
-- Dependencies: 212
-- Name: aperturas_cierres_id_apertura_cierre_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.aperturas_cierres_id_apertura_cierre_seq', 1, false);


--
-- TOC entry 3201 (class 0 OID 0)
-- Dependencies: 214
-- Name: cajas_id_caja_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cajas_id_caja_seq', 1, false);


--
-- TOC entry 3202 (class 0 OID 0)
-- Dependencies: 216
-- Name: cargos_id_cargo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cargos_id_cargo_seq', 1, false);


--
-- TOC entry 3203 (class 0 OID 0)
-- Dependencies: 218
-- Name: ciudades_id_ciudad_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ciudades_id_ciudad_seq', 1, false);


--
-- TOC entry 3204 (class 0 OID 0)
-- Dependencies: 220
-- Name: clientes_id_cliente_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clientes_id_cliente_seq', 1, false);


--
-- TOC entry 3205 (class 0 OID 0)
-- Dependencies: 222
-- Name: cobros_cabeceras_id_cobro_cabecera_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cobros_cabeceras_id_cobro_cabecera_seq', 1, false);


--
-- TOC entry 3206 (class 0 OID 0)
-- Dependencies: 226
-- Name: cobros_detalles_id_cobro_detalle_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cobros_detalles_id_cobro_detalle_seq', 1, false);


--
-- TOC entry 3207 (class 0 OID 0)
-- Dependencies: 224
-- Name: cobros_formas_id_cobro_forma_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cobros_formas_id_cobro_forma_seq', 1, false);


--
-- TOC entry 3208 (class 0 OID 0)
-- Dependencies: 250
-- Name: compras_cabeceras_id_compra_cabecera_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.compras_cabeceras_id_compra_cabecera_seq', 1, false);


--
-- TOC entry 3209 (class 0 OID 0)
-- Dependencies: 254
-- Name: compras_cuotas_id_compra_cuota_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.compras_cuotas_id_compra_cuota_seq', 1, false);


--
-- TOC entry 3210 (class 0 OID 0)
-- Dependencies: 252
-- Name: compras_detalles_id_compra_detalle_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.compras_detalles_id_compra_detalle_seq', 1, false);


--
-- TOC entry 3211 (class 0 OID 0)
-- Dependencies: 228
-- Name: depositos_id_deposito_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.depositos_id_deposito_seq', 1, false);


--
-- TOC entry 3212 (class 0 OID 0)
-- Dependencies: 230
-- Name: entidades_id_entidad_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.entidades_id_entidad_seq', 1, false);


--
-- TOC entry 3213 (class 0 OID 0)
-- Dependencies: 232
-- Name: estados_civiles_id_estado_civil_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.estados_civiles_id_estado_civil_seq', 1, false);


--
-- TOC entry 3214 (class 0 OID 0)
-- Dependencies: 204
-- Name: formularios_id_formulario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.formularios_id_formulario_seq', 6, true);


--
-- TOC entry 3215 (class 0 OID 0)
-- Dependencies: 234
-- Name: funcionarios_id_funcionario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.funcionarios_id_funcionario_seq', 1, false);


--
-- TOC entry 3216 (class 0 OID 0)
-- Dependencies: 248
-- Name: items_id_item_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.items_id_item_seq', 1, false);


--
-- TOC entry 3217 (class 0 OID 0)
-- Dependencies: 210
-- Name: ivas_id_iva_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ivas_id_iva_seq', 3, true);


--
-- TOC entry 3218 (class 0 OID 0)
-- Dependencies: 236
-- Name: marcas_id_marca_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marcas_id_marca_seq', 1, false);


--
-- TOC entry 3219 (class 0 OID 0)
-- Dependencies: 202
-- Name: menus_id_menu_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.menus_id_menu_seq', 6, true);


--
-- TOC entry 3220 (class 0 OID 0)
-- Dependencies: 238
-- Name: modelos_id_modelo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.modelos_id_modelo_seq', 1, false);


--
-- TOC entry 3221 (class 0 OID 0)
-- Dependencies: 240
-- Name: nacionalidades_id_nacionalidad_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nacionalidades_id_nacionalidad_seq', 1, false);


--
-- TOC entry 3222 (class 0 OID 0)
-- Dependencies: 198
-- Name: perfiles_id_perfil_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.perfiles_id_perfil_seq', 4, true);


--
-- TOC entry 3223 (class 0 OID 0)
-- Dependencies: 242
-- Name: personas_id_persona_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.personas_id_persona_seq', 1, false);


--
-- TOC entry 3224 (class 0 OID 0)
-- Dependencies: 244
-- Name: proveedores_id_proveedor_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.proveedores_id_proveedor_seq', 1, false);


--
-- TOC entry 3225 (class 0 OID 0)
-- Dependencies: 200
-- Name: sucursales_id_sucursal_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sucursales_id_sucursal_seq', 1, false);


--
-- TOC entry 3226 (class 0 OID 0)
-- Dependencies: 246
-- Name: tarjetas_id_tarjeta_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tarjetas_id_tarjeta_seq', 1, false);


--
-- TOC entry 3227 (class 0 OID 0)
-- Dependencies: 196
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_usuario_seq', 2, true);


--
-- TOC entry 3228 (class 0 OID 0)
-- Dependencies: 206
-- Name: ventas_cabeceras_id_venta_cabecera_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_cabeceras_id_venta_cabecera_seq', 8, true);


--
-- TOC entry 3229 (class 0 OID 0)
-- Dependencies: 256
-- Name: ventas_cuotas_id_venta_cuota_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_cuotas_id_venta_cuota_seq', 1, false);


--
-- TOC entry 3230 (class 0 OID 0)
-- Dependencies: 208
-- Name: ventas_detalles_id_venta_detalle_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_detalles_id_venta_detalle_seq', 4, true);


--
-- TOC entry 2936 (class 2606 OID 168027)
-- Name: aperturas_cierres aperturas_cierres_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aperturas_cierres
    ADD CONSTRAINT aperturas_cierres_pk PRIMARY KEY (id_apertura_cierre);


--
-- TOC entry 2938 (class 2606 OID 168038)
-- Name: cajas cajas_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cajas
    ADD CONSTRAINT cajas_pk PRIMARY KEY (id_caja);


--
-- TOC entry 2940 (class 2606 OID 168049)
-- Name: cargos cargos_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargos
    ADD CONSTRAINT cargos_pk PRIMARY KEY (id_cargo);


--
-- TOC entry 2942 (class 2606 OID 168060)
-- Name: ciudades ciudad_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ciudades
    ADD CONSTRAINT ciudad_pk PRIMARY KEY (id_ciudad);


--
-- TOC entry 2944 (class 2606 OID 168071)
-- Name: clientes clientes_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_pk PRIMARY KEY (id_cliente);


--
-- TOC entry 2946 (class 2606 OID 168082)
-- Name: cobros_cabeceras cobros_cabeceras_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cobros_cabeceras
    ADD CONSTRAINT cobros_cabeceras_pk PRIMARY KEY (id_cobro_cabecera);


--
-- TOC entry 2950 (class 2606 OID 168101)
-- Name: cobros_detalles cobros_detalles_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cobros_detalles
    ADD CONSTRAINT cobros_detalles_pk PRIMARY KEY (id_cobro_detalle);


--
-- TOC entry 2948 (class 2606 OID 168093)
-- Name: cobros_formas cobros_formas_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cobros_formas
    ADD CONSTRAINT cobros_formas_pk PRIMARY KEY (id_cobro_forma);


--
-- TOC entry 2974 (class 2606 OID 168246)
-- Name: compras_cabeceras compras_cabeceras_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compras_cabeceras
    ADD CONSTRAINT compras_cabeceras_pkey PRIMARY KEY (id_compra_cabecera);


--
-- TOC entry 2978 (class 2606 OID 168262)
-- Name: compras_cuotas compras_cuotas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compras_cuotas
    ADD CONSTRAINT compras_cuotas_pkey PRIMARY KEY (id_compra_cuota);


--
-- TOC entry 2976 (class 2606 OID 168254)
-- Name: compras_detalles compras_detalles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compras_detalles
    ADD CONSTRAINT compras_detalles_pkey PRIMARY KEY (id_compra_detalle);


--
-- TOC entry 2952 (class 2606 OID 168112)
-- Name: depositos depositos_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.depositos
    ADD CONSTRAINT depositos_pk PRIMARY KEY (id_deposito);


--
-- TOC entry 2954 (class 2606 OID 168124)
-- Name: entidades entidades_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entidades
    ADD CONSTRAINT entidades_pk PRIMARY KEY (id_entidad);


--
-- TOC entry 2956 (class 2606 OID 168135)
-- Name: estados_civiles estados_civiles_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estados_civiles
    ADD CONSTRAINT estados_civiles_pk PRIMARY KEY (id_estado_civil);


--
-- TOC entry 2928 (class 2606 OID 151619)
-- Name: formularios formularios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.formularios
    ADD CONSTRAINT formularios_pkey PRIMARY KEY (id_formulario);


--
-- TOC entry 2958 (class 2606 OID 168148)
-- Name: funcionarios funcionarios_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.funcionarios
    ADD CONSTRAINT funcionarios_pk PRIMARY KEY (id_funcionario);


--
-- TOC entry 2972 (class 2606 OID 168225)
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id_item);


--
-- TOC entry 2934 (class 2606 OID 159852)
-- Name: ivas ivas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ivas
    ADD CONSTRAINT ivas_pkey PRIMARY KEY (id_iva);


--
-- TOC entry 2960 (class 2606 OID 168159)
-- Name: marcas marcas_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marcas
    ADD CONSTRAINT marcas_pk PRIMARY KEY (id_marca);


--
-- TOC entry 2926 (class 2606 OID 151608)
-- Name: menus menus_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menus
    ADD CONSTRAINT menus_pkey PRIMARY KEY (id_menu);


--
-- TOC entry 2962 (class 2606 OID 168170)
-- Name: modelos modelos_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modelos
    ADD CONSTRAINT modelos_pk PRIMARY KEY (id_modelo);


--
-- TOC entry 2964 (class 2606 OID 168181)
-- Name: nacionalidades nacionalidades_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nacionalidades
    ADD CONSTRAINT nacionalidades_pk PRIMARY KEY (id_nacionalidad);


--
-- TOC entry 2922 (class 2606 OID 151575)
-- Name: perfiles perfiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfiles
    ADD CONSTRAINT perfiles_pkey PRIMARY KEY (id_perfil);


--
-- TOC entry 2966 (class 2606 OID 168192)
-- Name: personas personas_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personas
    ADD CONSTRAINT personas_pk PRIMARY KEY (id_persona);


--
-- TOC entry 2968 (class 2606 OID 168203)
-- Name: proveedores proveedores_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedores
    ADD CONSTRAINT proveedores_pk PRIMARY KEY (id_proveedor);


--
-- TOC entry 2924 (class 2606 OID 151597)
-- Name: sucursales sucursales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sucursales
    ADD CONSTRAINT sucursales_pkey PRIMARY KEY (id_sucursal);


--
-- TOC entry 2970 (class 2606 OID 168214)
-- Name: tarjetas tarjetas_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tarjetas
    ADD CONSTRAINT tarjetas_pk PRIMARY KEY (id_tarjeta);


--
-- TOC entry 2920 (class 2606 OID 151564)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 2930 (class 2606 OID 159800)
-- Name: ventas_cabeceras ventas_cabeceras_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas_cabeceras
    ADD CONSTRAINT ventas_cabeceras_pkey PRIMARY KEY (id_venta_cabecera);


--
-- TOC entry 2980 (class 2606 OID 168270)
-- Name: ventas_cuotas ventas_cuotas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas_cuotas
    ADD CONSTRAINT ventas_cuotas_pkey PRIMARY KEY (id_venta_cuota);


--
-- TOC entry 2932 (class 2606 OID 159808)
-- Name: ventas_detalles ventas_detalles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas_detalles
    ADD CONSTRAINT ventas_detalles_pkey PRIMARY KEY (id_venta_detalle);


-- Completed on 2020-02-11 10:43:36

--
-- PostgreSQL database dump complete
--

