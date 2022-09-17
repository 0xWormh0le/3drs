--
-- PostgreSQL database dump
--

-- Dumped from database version 11.6
-- Dumped by pg_dump version 11.7

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

--
-- Name: tiger; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA tiger;


--
-- Name: tiger_data; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA tiger_data;


--
-- Name: topology; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA topology;


--
-- Name: SCHEMA topology; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA topology IS 'PostGIS Topology schema';


--
-- Name: cube; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS cube WITH SCHEMA public;


--
-- Name: EXTENSION cube; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION cube IS 'data type for multidimensional cubes';


--
-- Name: earthdistance; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS earthdistance WITH SCHEMA public;


--
-- Name: EXTENSION earthdistance; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION earthdistance IS 'calculate great-circle distances on the surface of the Earth';


--
-- Name: fuzzystrmatch; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS fuzzystrmatch WITH SCHEMA public;


--
-- Name: EXTENSION fuzzystrmatch; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION fuzzystrmatch IS 'determine similarities and distance between strings';


--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry, geography, and raster spatial types and functions';


--
-- Name: postgis_tiger_geocoder; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis_tiger_geocoder WITH SCHEMA tiger;


--
-- Name: EXTENSION postgis_tiger_geocoder; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION postgis_tiger_geocoder IS 'PostGIS tiger geocoder and reverse geocoder';


--
-- Name: postgis_topology; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis_topology WITH SCHEMA topology;


--
-- Name: EXTENSION postgis_topology; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION postgis_topology IS 'PostGIS topology spatial types and functions';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Cloud_SQL_Export_2019-12-29 (11_45_56); Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Cloud_SQL_Export_2019-12-29 (11_45_56)" (
    c1 text
);


--
-- Name: _channel; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._channel (
    id bigint NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: _channel_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._channel_user (
    channel_id bigint NOT NULL,
    user_id bigint NOT NULL
);


--
-- Name: _channel_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._channel_users (
    channel_id bigint NOT NULL,
    user_id character varying(255) NOT NULL
);


--
-- Name: _like; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._like (
    liked_username character varying(255) NOT NULL,
    sender_username character varying(255) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    l boolean NOT NULL
);


--
-- Name: _listing; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._listing (
    id bigint NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    listing_status character varying(255),
    propery_id bigint
);


--
-- Name: _message; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._message (
    id bigint NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    body text,
    sender character varying(255),
    subject character varying(255),
    type character varying(255),
    _channel_id bigint,
    _sender_username bigint
);


--
-- Name: _photo; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._photo (
    id bigint NOT NULL,
    url character varying(255),
    property_id bigint,
    _user_id bigint
);


--
-- Name: _photos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._photos (
    id bigint NOT NULL,
    url character varying(255),
    property_id bigint,
    user_id bigint
);


--
-- Name: _property; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._property (
    id bigint NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    address character varying(255),
    city character varying(255),
    country character varying(255),
    description text,
    loc public.geometry(Point,26910),
    state character varying(255),
    zip character varying(255),
    _owner_id bigint
);


--
-- Name: _property_photos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._property_photos (
    id bigint NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    photo_url character varying(255),
    property_id bigint NOT NULL
);


--
-- Name: _token; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._token (
    id character varying(255) NOT NULL,
    revoked boolean
);


--
-- Name: _user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._user (
    id bigint NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    about_me character varying(40),
    age integer,
    avatar character varying(255),
    birth_date date,
    email character varying(40),
    email_verification_required boolean DEFAULT false,
    first_name character varying(40),
    full_name character varying(80),
    gender character varying(40),
    last_name character varying(40),
    password character varying(100),
    phone_number character varying(40),
    phone_verification_required boolean DEFAULT false,
    user_status character varying(255),
    verification_code character varying(10),
    CONSTRAINT _user_age_check CHECK (((age <= 120) AND (age >= 12)))
);


--
-- Name: _user_property_fav; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._user_property_fav (
    user_id bigint NOT NULL,
    property_id bigint NOT NULL
);


--
-- Name: company; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.company (
    id integer NOT NULL,
    name text NOT NULL,
    age integer NOT NULL,
    address character(50),
    salary real
);


--
-- Name: hibernate_sequence; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.hibernate_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hibernate_sequences; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.hibernate_sequences (
    sequence_name character varying(255) NOT NULL,
    next_val bigint
);


--
-- Name: my_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.my_seq
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: read_marker; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.read_marker (
    id integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    channel_id character varying(255),
    member_id character varying(255),
    t timestamp without time zone
);


--
-- Name: read_marker_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.read_marker_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: read_marker_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.read_marker_id_seq OWNED BY public.read_marker.id;


--
-- Name: role; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.role (
    id bigint NOT NULL,
    name character varying(60)
);


--
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- Name: spring_session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.spring_session (
    primary_id character(36) NOT NULL,
    session_id character(36) NOT NULL,
    creation_time bigint NOT NULL,
    last_access_time bigint NOT NULL,
    max_inactive_interval integer NOT NULL,
    expiry_time bigint NOT NULL,
    principal_name character varying(100)
);


--
-- Name: spring_session_attributes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.spring_session_attributes (
    session_primary_id character(36) NOT NULL,
    attribute_name character varying(200) NOT NULL,
    attribute_bytes bytea NOT NULL
);


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_roles (
    user_id bigint NOT NULL,
    role_id bigint NOT NULL
);


--
-- Name: read_marker id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.read_marker ALTER COLUMN id SET DEFAULT nextval('public.read_marker_id_seq'::regclass);


--
-- Name: role id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- Data for Name: Cloud_SQL_Export_2019-12-29 (11_45_56); Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Cloud_SQL_Export_2019-12-29 (11_45_56)" (c1) FROM stdin;
--
-- PostgreSQL database dump
--
\N
-- Dumped from database version 11.5
-- Dumped by pg_dump version 11.5
\N
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
\N
--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--
\N
CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;
\N
\N
--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: -
--
\N
COMMENT ON EXTENSION postgis IS 'PostGIS geometry, geography, and raster spatial types and functions';
\N
\N
SET default_tablespace = '';
\N
SET default_with_oids = false;
\N
--
-- Name: __user; Type: TABLE; Schema: public; Owner: -
--
\N
CREATE TABLE public.__user (
    id bigint NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    email character varying(40),
    full_name character varying(255),
    geom public.geometry(Point,26910),
    name character varying(40),
    password character varying(100),
    phone character varying(40),
    username character varying(15)
);
\N
\N
--
-- Name: _channel; Type: TABLE; Schema: public; Owner: -
--
\N
CREATE TABLE public._channel (
    id bigint NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);
\N
\N
--
-- Name: _channel_user; Type: TABLE; Schema: public; Owner: -
--
\N
CREATE TABLE public._channel_user (
    channel_id bigint NOT NULL,
    user_id bigint NOT NULL
);
\N
\N
--
-- Name: _like; Type: TABLE; Schema: public; Owner: -
--
\N
CREATE TABLE public._like (
    liked_id bigint NOT NULL,
    sender_id bigint NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    l boolean NOT NULL
);
\N
\N
--
-- Name: _listing; Type: TABLE; Schema: public; Owner: -
--
\N
CREATE TABLE public._listing (
    id bigint NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    listing_status character varying(255),
    propery_id bigint
);
\N
\N
--
-- Name: _match; Type: TABLE; Schema: public; Owner: -
--
\N
CREATE TABLE public._match (
    uid1 bigint NOT NULL,
    uid2 bigint NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    have_conversation boolean NOT NULL,
    initiator_uid bigint,
    _channel_id bigint
);
\N
\N
--
-- Name: _message; Type: TABLE; Schema: public; Owner: -
--
\N
CREATE TABLE public._message (
    id bigint NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    body text,
    sender character varying(255),
    subject character varying(255),
    type character varying(255),
    _channel_id bigint,
    _sender_username bigint
);
\N
\N
--
-- Name: _photo; Type: TABLE; Schema: public; Owner: -
--
\N
CREATE TABLE public._photo (
    id bigint NOT NULL,
    url character varying(255),
    property_id bigint,
    _user_id bigint
);
\N
\N
--
-- Name: _property; Type: TABLE; Schema: public; Owner: -
--
\N
CREATE TABLE public._property (
    id bigint NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    address character varying(255),
    country character varying(255),
    loc public.geometry(Point,26910),
    state character varying(255),
    zip character varying(255),
    _owner_id bigint,
    city character varying(255),
    description text
);
\N
\N
--
-- Name: _property_photos; Type: TABLE; Schema: public; Owner: -
--
\N
CREATE TABLE public._property_photos (
    id bigint NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    photo_url character varying(255),
    property_id bigint NOT NULL
);
\N
\N
--
-- Name: _user; Type: TABLE; Schema: public; Owner: -
--
\N
CREATE TABLE public._user (
    id bigint NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    birth_date date,
    email character varying(40),
    email_verification_required boolean DEFAULT false,
    geom public.geometry(Point,26910),
    name character varying(40),
    password character varying(100),
    phone_number character varying(40),
    phone_verification_required boolean DEFAULT false,
    user_status character varying(255),
    verification_code character varying(10),
    avatar character varying(500),
    about_me character varying(40),
    first_name character varying(40),
    gender character varying(40),
    last_name character varying(40),
    full_name character varying(80),
    age integer,
    CONSTRAINT _user_age_check CHECK (((age <= 120) AND (age >= 12)))
);
\N
\N
--
-- Name: _user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
\N
CREATE SEQUENCE public._user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
\N
\N
--
-- Name: _user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--
\N
ALTER SEQUENCE public._user_id_seq OWNED BY public._user.id;
\N
\N
--
-- Name: _user_property_fav; Type: TABLE; Schema: public; Owner: -
--
\N
CREATE TABLE public._user_property_fav (
    user_id bigint NOT NULL,
    property_id bigint NOT NULL
);
\N
\N
--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: -
--
\N
CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);
\N
\N
--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
\N
CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
\N
\N
--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--
\N
ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;
\N
\N
--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: -
--
\N
CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);
\N
\N
--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
\N
CREATE SEQUENCE public.auth_group_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
\N
\N
--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--
\N
ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;
\N
\N
--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: -
--
\N
CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);
\N
\N
--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
\N
CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
\N
\N
--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--
\N
ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;
\N
\N
--
-- Name: auth_user; Type: TABLE; Schema: public; Owner: -
--
\N
CREATE TABLE public.auth_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(150) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL
);
\N
\N
--
-- Name: auth_user_groups; Type: TABLE; Schema: public; Owner: -
--
\N
CREATE TABLE public.auth_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);
\N
\N
--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
\N
CREATE SEQUENCE public.auth_user_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
\N
\N
--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--
\N
ALTER SEQUENCE public.auth_user_groups_id_seq OWNED BY public.auth_user_groups.id;
\N
\N
--
-- Name: auth_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
\N
CREATE SEQUENCE public.auth_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
\N
\N
--
-- Name: auth_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--
\N
ALTER SEQUENCE public.auth_user_id_seq OWNED BY public.auth_user.id;
\N
\N
--
-- Name: auth_user_user_permissions; Type: TABLE; Schema: public; Owner: -
--
\N
CREATE TABLE public.auth_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);
\N
\N
--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
\N
CREATE SEQUENCE public.auth_user_user_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
\N
\N
--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--
\N
ALTER SEQUENCE public.auth_user_user_permissions_id_seq OWNED BY public.auth_user_user_permissions.id;
\N
\N
--
-- Name: device_metadata; Type: TABLE; Schema: public; Owner: -
--
\N
CREATE TABLE public.device_metadata (
    id bigint NOT NULL,
    device_details character varying(255),
    last_logged_in timestamp without time zone,
    location character varying(255),
    user_id bigint
);
\N
\N
--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: -
--
\N
CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);
\N
\N
--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
\N
CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
\N
\N
--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--
\N
ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;
\N
\N
--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: -
--
\N
CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);
\N
\N
--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
\N
CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
\N
\N
--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--
\N
ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;
\N
\N
--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: -
--
\N
CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);
\N
\N
--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
\N
CREATE SEQUENCE public.django_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
\N
\N
--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--
\N
ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;
\N
\N
--
-- Name: django_session; Type: TABLE; Schema: public; Owner: -
--
\N
CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);
\N
\N
--
-- Name: hibernate_sequence; Type: SEQUENCE; Schema: public; Owner: -
--
\N
CREATE SEQUENCE public.hibernate_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
\N
\N
--
-- Name: read_marker; Type: TABLE; Schema: public; Owner: -
--
\N
CREATE TABLE public.read_marker (
    id integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    channel_id character varying(255),
    member_id character varying(255),
    t timestamp without time zone
);
\N
\N
--
-- Name: read_marker_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
\N
CREATE SEQUENCE public.read_marker_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
\N
\N
--
-- Name: read_marker_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--
\N
ALTER SEQUENCE public.read_marker_id_seq OWNED BY public.read_marker.id;
\N
\N
--
-- Name: role; Type: TABLE; Schema: public; Owner: -
--
\N
CREATE TABLE public.role (
    id bigint NOT NULL,
    name character varying(60)
);
\N
\N
--
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
\N
CREATE SEQUENCE public.role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
\N
\N
--
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--
\N
ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;
\N
\N
--
-- Name: spring_session; Type: TABLE; Schema: public; Owner: -
--
\N
CREATE TABLE public.spring_session (
    primary_id character(36) NOT NULL,
    session_id character(36) NOT NULL,
    creation_time bigint NOT NULL,
    last_access_time bigint NOT NULL,
    max_inactive_interval integer NOT NULL,
    expiry_time bigint NOT NULL,
    principal_name character varying(100)
);
\N
\N
--
-- Name: spring_session_attributes; Type: TABLE; Schema: public; Owner: -
--
\N
CREATE TABLE public.spring_session_attributes (
    session_primary_id character(36) NOT NULL,
    attribute_name character varying(200) NOT NULL,
    attribute_bytes bytea NOT NULL
);
\N
\N
--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: -
--
\N
CREATE TABLE public.user_roles (
    user_id bigint NOT NULL,
    role_id bigint NOT NULL
);
\N
\N
--
-- Name: _user id; Type: DEFAULT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public._user ALTER COLUMN id SET DEFAULT nextval('public._user_id_seq'::regclass);
\N
\N
--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);
\N
\N
--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);
\N
\N
--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);
\N
\N
--
-- Name: auth_user id; Type: DEFAULT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.auth_user ALTER COLUMN id SET DEFAULT nextval('public.auth_user_id_seq'::regclass);
\N
\N
--
-- Name: auth_user_groups id; Type: DEFAULT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.auth_user_groups ALTER COLUMN id SET DEFAULT nextval('public.auth_user_groups_id_seq'::regclass);
\N
\N
--
-- Name: auth_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_user_user_permissions_id_seq'::regclass);
\N
\N
--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);
\N
\N
--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);
\N
\N
--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);
\N
\N
--
-- Name: read_marker id; Type: DEFAULT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.read_marker ALTER COLUMN id SET DEFAULT nextval('public.read_marker_id_seq'::regclass);
\N
\N
--
-- Name: role id; Type: DEFAULT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);
\N
\N
--
-- Data for Name: __user; Type: TABLE DATA; Schema: public; Owner: -
--
\N
COPY public.__user (id, created_at, updated_at, email, full_name, geom, name, password, phone, username) FROM stdin;
\\.
\N
\N
--
-- Data for Name: _channel; Type: TABLE DATA; Schema: public; Owner: -
--
\N
COPY public._channel (id, created_at, updated_at) FROM stdin;
\\.
\N
\N
--
-- Data for Name: _channel_user; Type: TABLE DATA; Schema: public; Owner: -
--
\N
COPY public._channel_user (channel_id, user_id) FROM stdin;
\\.
\N
\N
--
-- Data for Name: _like; Type: TABLE DATA; Schema: public; Owner: -
--
\N
COPY public._like (liked_id, sender_id, created_at, updated_at, l) FROM stdin;
\\.
\N
\N
--
-- Data for Name: _listing; Type: TABLE DATA; Schema: public; Owner: -
--
\N
COPY public._listing (id, created_at, updated_at, listing_status, propery_id) FROM stdin;
\\.
\N
\N
--
-- Data for Name: _match; Type: TABLE DATA; Schema: public; Owner: -
--
\N
COPY public._match (uid1, uid2, created_at, updated_at, have_conversation, initiator_uid, _channel_id) FROM stdin;
\\.
\N
\N
--
-- Data for Name: _message; Type: TABLE DATA; Schema: public; Owner: -
--
\N
COPY public._message (id, created_at, updated_at, body, sender, subject, type, _channel_id, _sender_username) FROM stdin;
\\.
\N
\N
--
-- Data for Name: _photo; Type: TABLE DATA; Schema: public; Owner: -
--
\N
COPY public._photo (id, url, property_id, _user_id) FROM stdin;
\\.
\N
\N
--
-- Data for Name: _property; Type: TABLE DATA; Schema: public; Owner: -
--
\N
COPY public._property (id, created_at, updated_at, address, country, loc, state, zip, _owner_id, city, description) FROM stdin;
\\.
\N
\N
--
-- Data for Name: _property_photos; Type: TABLE DATA; Schema: public; Owner: -
--
\N
COPY public._property_photos (id, created_at, updated_at, photo_url, property_id) FROM stdin;
\\.
\N
\N
--
-- Data for Name: _user; Type: TABLE DATA; Schema: public; Owner: -
--
\N
COPY public._user (id, created_at, updated_at, birth_date, email, email_verification_required, geom, name, password, phone_number, phone_verification_required, user_status, verification_code, avatar, about_me, first_name, gender, last_name, full_name, age) FROM stdin;
\\.
\N
\N
--
-- Data for Name: _user_property_fav; Type: TABLE DATA; Schema: public; Owner: -
--
\N
COPY public._user_property_fav (user_id, property_id) FROM stdin;
\\.
\N
\N
--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: -
--
\N
COPY public.auth_group (id, name) FROM stdin;
\\.
\N
\N
--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: -
--
\N
COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\\.
\N
\N
--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: -
--
\N
COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
\\.
\N
\N
--
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: -
--
\N
COPY public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) FROM stdin;
\\.
\N
\N
--
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: -
--
\N
COPY public.auth_user_groups (id, user_id, group_id) FROM stdin;
\\.
\N
\N
--
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: -
--
\N
COPY public.auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
\\.
\N
\N
--
-- Data for Name: device_metadata; Type: TABLE DATA; Schema: public; Owner: -
--
\N
COPY public.device_metadata (id, device_details, last_logged_in, location, user_id) FROM stdin;
\\.
\N
\N
--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: -
--
\N
COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
\\.
\N
\N
--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: -
--
\N
COPY public.django_content_type (id, app_label, model) FROM stdin;
\\.
\N
\N
--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: -
--
\N
COPY public.django_migrations (id, app, name, applied) FROM stdin;
\\.
\N
\N
--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: -
--
\N
COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
\\.
\N
\N
--
-- Data for Name: read_marker; Type: TABLE DATA; Schema: public; Owner: -
--
\N
COPY public.read_marker (id, created_at, updated_at, channel_id, member_id, t) FROM stdin;
\\.
\N
\N
--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: -
--
\N
COPY public.role (id, name) FROM stdin;
\\.
\N
\N
--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: -
--
\N
COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\\.
\N
\N
--
-- Data for Name: spring_session; Type: TABLE DATA; Schema: public; Owner: -
--
\N
COPY public.spring_session (primary_id, session_id, creation_time, last_access_time, max_inactive_interval, expiry_time, principal_name) FROM stdin;
\\.
\N
\N
--
-- Data for Name: spring_session_attributes; Type: TABLE DATA; Schema: public; Owner: -
--
\N
COPY public.spring_session_attributes (session_primary_id, attribute_name, attribute_bytes) FROM stdin;
\\.
\N
\N
--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: -
--
\N
COPY public.user_roles (user_id, role_id) FROM stdin;
\\.
\N
\N
--
-- Name: _user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--
\N
SELECT pg_catalog.setval('public._user_id_seq', 407, true);
\N
\N
--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--
\N
SELECT pg_catalog.setval('public.auth_group_id_seq', 1, true);
\N
\N
--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--
\N
SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 32, true);
\N
\N
--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--
\N
SELECT pg_catalog.setval('public.auth_permission_id_seq', 152, true);
\N
\N
--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--
\N
SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, false);
\N
\N
--
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--
\N
SELECT pg_catalog.setval('public.auth_user_id_seq', 2, true);
\N
\N
--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--
\N
SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);
\N
\N
--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--
\N
SELECT pg_catalog.setval('public.django_admin_log_id_seq', 12, true);
\N
\N
--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--
\N
SELECT pg_catalog.setval('public.django_content_type_id_seq', 38, true);
\N
\N
--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--
\N
SELECT pg_catalog.setval('public.django_migrations_id_seq', 23, true);
\N
\N
--
-- Name: hibernate_sequence; Type: SEQUENCE SET; Schema: public; Owner: -
--
\N
SELECT pg_catalog.setval('public.hibernate_sequence', 1983, true);
\N
\N
--
-- Name: read_marker_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--
\N
SELECT pg_catalog.setval('public.read_marker_id_seq', 1, false);
\N
\N
--
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--
\N
SELECT pg_catalog.setval('public.role_id_seq', 310, true);
\N
\N
--
-- Name: __user __user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.__user
    ADD CONSTRAINT __user_pkey PRIMARY KEY (id);
\N
\N
--
-- Name: _channel _channel_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
--
ALTER TABLE ONLY public._channel
    ADD CONSTRAINT _channel_pkey PRIMARY KEY (id);
\N
\N
--
-- Name: _like _like_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public._like
    ADD CONSTRAINT _like_pkey PRIMARY KEY (liked_id, sender_id);
\N
\N
--
-- Name: _listing _listing_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public._listing
    ADD CONSTRAINT _listing_pkey PRIMARY KEY (id);
\N
\N
--
-- Name: _match _match_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public._match
    ADD CONSTRAINT _match_pkey PRIMARY KEY (uid1, uid2);
\N
\N
--
-- Name: _message _message_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public._message
    ADD CONSTRAINT _message_pkey PRIMARY KEY (id);
\N
\N
--
-- Name: _photo _photo_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public._photo
    ADD CONSTRAINT _photo_pkey PRIMARY KEY (id);
\N
\N
--
-- Name: _property_photos _property_photos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public._property_photos
    ADD CONSTRAINT _property_photos_pkey PRIMARY KEY (id);
\N
\N
--
-- Name: _property _property_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public._property
    ADD CONSTRAINT _property_pkey PRIMARY KEY (id);
\N
\N
--
-- Name: _user _user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public._user
    ADD CONSTRAINT _user_pkey PRIMARY KEY (id);
\N
\N
--
-- Name: _user_property_fav _user_property_fav_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public._user_property_fav
    ADD CONSTRAINT _user_property_fav_pkey PRIMARY KEY (user_id, property_id);
\N
\N
--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);
\N
\N
--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);
\N
\N
--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);
\N
\N
--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);
\N
\N
--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);
\N
\N
--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);
\N
\N
--
-- Name: auth_user_groups auth_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);
\N
\N
--
-- Name: auth_user_groups auth_user_groups_user_id_group_id_94350c0c_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq UNIQUE (user_id, group_id);
\N
\N
--
-- Name: auth_user auth_user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);
\N
\N
-- Name: auth_user_user_permissions auth_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);
\N
\N
--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_permission_id_14a6b632_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq UNIQUE (user_id, permission_id);
\N
\N
--
-- Name: auth_user auth_user_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);
\N
\N
--
-- Name: device_metadata device_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.device_metadata
    ADD CONSTRAINT device_metadata_pkey PRIMARY KEY (id);
\N
\N
--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);
\N
\N
--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);
\N
\N
--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);
\N
\N
--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);
\N
\N
--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);
\N
\N
--
-- Name: read_marker read_marker_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.read_marker
    ADD CONSTRAINT read_marker_pkey PRIMARY KEY (id);
\N
\N
--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);
\N
\N
--
-- Name: spring_session_attributes spring_session_attributes_pk; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.spring_session_attributes
    ADD CONSTRAINT spring_session_attributes_pk PRIMARY KEY (session_primary_id, attribute_name);
\N
\N
--
-- Name: spring_session spring_session_pk; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.spring_session
    ADD CONSTRAINT spring_session_pk PRIMARY KEY (primary_id);
\N
\N
--
-- Name: _user uk1b1tkkmtamnpuqpgqtlyig1br; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public._user
    ADD CONSTRAINT uk1b1tkkmtamnpuqpgqtlyig1br UNIQUE (phone_number);
\N
\N
--
-- Name: __user uk8oqilvya58i54y0yc4e8lisxq; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.__user
    ADD CONSTRAINT uk8oqilvya58i54y0yc4e8lisxq UNIQUE (username);
\N
\N
--
-- Name: __user uk_cq03le1da747km7srmmvf5h92; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.__user
    ADD CONSTRAINT uk_cq03le1da747km7srmmvf5h92 UNIQUE (email, phone);
\N
\N
--
-- Name: role uk_epk9im9l9q67xmwi4hbed25do; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.role
    ADD CONSTRAINT uk_epk9im9l9q67xmwi4hbed25do UNIQUE (name);
\N
\N
--
-- Name: _user uk_ruq9ye5n9xmd4y23fc67m539t; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public._user
    ADD CONSTRAINT uk_ruq9ye5n9xmd4y23fc67m539t UNIQUE (email, phone_number);
\N
\N
--
-- Name: __user uke5bw134jg37knajdhawnsl7pb; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.__user
    ADD CONSTRAINT uke5bw134jg37knajdhawnsl7pb UNIQUE (phone);
\N
\N
--
-- Name: _user ukk11y3pdtsrjgy8w9b6q4bjwrx; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public._user
    ADD CONSTRAINT ukk11y3pdtsrjgy8w9b6q4bjwrx UNIQUE (email);
\N
\N
--
-- Name: __user ukov5hasis2ob6uncpgnjxyqnrt; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.__user
    ADD CONSTRAINT ukov5hasis2ob6uncpgnjxyqnrt UNIQUE (email);
\N
\N
--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id);
\N
\N
--
-- Name: _message_index_0; Type: INDEX; Schema: public; Owner: -
--
\N
CREATE INDEX _message_index_0 ON public._message USING btree (_channel_id);
\N
\N
--
-- Name: _photo_index_0; Type: INDEX; Schema: public; Owner: -
--
\N
CREATE INDEX _photo_index_0 ON public._photo USING btree (_user_id);
\N
\N
--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: -
--
\N
CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);
\N
\N
--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: -
--
\N
CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);
\N
\N
--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: -
--
\N
CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);
\N
\N
--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: -
--
\N
CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);
\N
\N
--
-- Name: auth_user_groups_group_id_97559544; Type: INDEX; Schema: public; Owner: -
--
\N
CREATE INDEX auth_user_groups_group_id_97559544 ON public.auth_user_groups USING btree (group_id);
\N
\N
--
-- Name: auth_user_groups_user_id_6a12ed8b; Type: INDEX; Schema: public; Owner: -
--
\N
CREATE INDEX auth_user_groups_user_id_6a12ed8b ON public.auth_user_groups USING btree (user_id);
\N
\N
--
-- Name: auth_user_user_permissions_permission_id_1fbb5f2c; Type: INDEX; Schema: public; Owner: -
--
\N
CREATE INDEX auth_user_user_permissions_permission_id_1fbb5f2c ON public.auth_user_user_permissions USING btree (permission_id);
\N
\N
--
-- Name: auth_user_user_permissions_user_id_a95ead1b; Type: INDEX; Schema: public; Owner: -
--
\N
CREATE INDEX auth_user_user_permissions_user_id_a95ead1b ON public.auth_user_user_permissions USING btree (user_id);
\N
\N
--
-- Name: auth_user_username_6821ab7c_like; Type: INDEX; Schema: public; Owner: -
--
\N
CREATE INDEX auth_user_username_6821ab7c_like ON public.auth_user USING btree (username varchar_pattern_ops);
\N
\N
--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: -
--
\N
CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);
\N
\N
--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: -
--
\N
CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);
\N
\N
--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: -
--
\N
CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);
\N
\N
--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: -
--
\N
CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);
\N
\N
--
-- Name: spring_session_ix1; Type: INDEX; Schema: public; Owner: -
--
\N
CREATE UNIQUE INDEX spring_session_ix1 ON public.spring_session USING btree (session_id);
\N
\N
--
-- Name: spring_session_ix2; Type: INDEX; Schema: public; Owner: -
--
\N
CREATE INDEX spring_session_ix2 ON public.spring_session USING btree (expiry_time);
\N
\N
--
-- Name: spring_session_ix3; Type: INDEX; Schema: public; Owner: -
--
\N
CREATE INDEX spring_session_ix3 ON public.spring_session USING btree (principal_name);
\N
\N
--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;
\N
\N
--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;
\N
\N
--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;
\N
\N
--
-- Name: auth_user_groups auth_user_groups_group_id_97559544_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;
\N
\N
--
-- Name: auth_user_groups auth_user_groups_user_id_6a12ed8b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
\N
\N
--
-- Name: auth_user_user_permissions auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;
\N
\N
--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
\N
\N
--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;
\N
\N
--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;
\N
\N
--
-- Name: _user_property_fav fk1x9q64mpaef5dqejkq9ph1i16; Type: FK CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public._user_property_fav
    ADD CONSTRAINT fk1x9q64mpaef5dqejkq9ph1i16 FOREIGN KEY (user_id) REFERENCES public._user(id);
\N
\N
--
-- Name: _listing fk2rjltqqrgwepyoww4ioxhd8ts; Type: FK CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public._listing
    ADD CONSTRAINT fk2rjltqqrgwepyoww4ioxhd8ts FOREIGN KEY (propery_id) REFERENCES public._property(id);
\N
\N
--
-- Name: _property_photos fkbmbj7xac0hwfryc5ch19w9wq6; Type: FK CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public._property_photos
    ADD CONSTRAINT fkbmbj7xac0hwfryc5ch19w9wq6 FOREIGN KEY (property_id) REFERENCES public._property(id);
\N
\N
--
-- Name: user_roles fkcbsnrgq3e9qe6kuxq7wx6vlfm; Type: FK CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT fkcbsnrgq3e9qe6kuxq7wx6vlfm FOREIGN KEY (user_id) REFERENCES public._user(id);
\N
\N
--
-- Name: _photo fkepqq0fp1n0rai2ioohnpb8qu6; Type: FK CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public._photo
    ADD CONSTRAINT fkepqq0fp1n0rai2ioohnpb8qu6 FOREIGN KEY (property_id) REFERENCES public._property(id);
\N
\N
--
-- Name: _user_property_fav fkfdrej7sv45rnfx6os6p3yyanx; Type: FK CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public._user_property_fav
    ADD CONSTRAINT fkfdrej7sv45rnfx6os6p3yyanx FOREIGN KEY (property_id) REFERENCES public._property(id);
\N
\N
--
-- Name: _message fkgm74sj06piyjqp2s4m7gatt67; Type: FK CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public._message
    ADD CONSTRAINT fkgm74sj06piyjqp2s4m7gatt67 FOREIGN KEY (_sender_username) REFERENCES public._user(id);
\N
\N
--
-- Name: _property fkj5yks8vfk0lmb70igihfvh6sm; Type: FK CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public._property
    ADD CONSTRAINT fkj5yks8vfk0lmb70igihfvh6sm FOREIGN KEY (_owner_id) REFERENCES public._user(id);
\N
\N
--
-- Name: _message fkmlupwb5pj3wb347q6re903efx; Type: FK CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public._message
    ADD CONSTRAINT fkmlupwb5pj3wb347q6re903efx FOREIGN KEY (_channel_id) REFERENCES public._channel(id);
\N
\N
--
-- Name: _channel_user fkq1o4cmy8ok21n7hhl3bhyekjv; Type: FK CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public._channel_user
    ADD CONSTRAINT fkq1o4cmy8ok21n7hhl3bhyekjv FOREIGN KEY (user_id) REFERENCES public._user(id);
\N
\N
--
-- Name: _photo fkqj2uf6dqnpc2gffpg1517ib4j; Type: FK CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public._photo
    ADD CONSTRAINT fkqj2uf6dqnpc2gffpg1517ib4j FOREIGN KEY (_user_id) REFERENCES public._user(id);
\N
\N
--
-- Name: user_roles fkrhfovtciq1l558cw6udg0h0d3; Type: FK CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT fkrhfovtciq1l558cw6udg0h0d3 FOREIGN KEY (role_id) REFERENCES public.role(id);
\N
\N
--
-- Name: _channel_user fksf8mx33ryc1fot8ytg7w39fo0; Type: FK CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public._channel_user
    ADD CONSTRAINT fksf8mx33ryc1fot8ytg7w39fo0 FOREIGN KEY (channel_id) REFERENCES public._channel(id);
\N
\N
--
-- Name: spring_session_attributes spring_session_attributes_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--
\N
ALTER TABLE ONLY public.spring_session_attributes
    ADD CONSTRAINT spring_session_attributes_fk FOREIGN KEY (session_primary_id) REFERENCES public.spring_session(primary_id) ON DELETE CASCADE;
\N
\N
--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--
\N
REVOKE ALL ON SCHEMA public FROM cloudsqladmin;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO cloudsqlsuperuser;
GRANT ALL ON SCHEMA public TO PUBLIC;
GRANT USAGE ON SCHEMA public TO andre;
GRANT USAGE ON SCHEMA public TO schenker;
\N
\N
--
-- Name: TABLE __user; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public.__user TO andre;
GRANT ALL ON TABLE public.__user TO schenker;
\N
\N
--
-- Name: TABLE _channel; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public._channel TO schenker;
\N
\N
--
-- Name: TABLE _channel_user; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public._channel_user TO schenker;
\N
\N
--
-- Name: TABLE _like; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public._like TO andre;
GRANT ALL ON TABLE public._like TO schenker;
\N
\N
--
-- Name: TABLE _listing; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public._listing TO schenker;
\N
\N
--
-- Name: TABLE _match; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public._match TO andre;
GRANT ALL ON TABLE public._match TO schenker;
\N
\N
--
-- Name: TABLE _message; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public._message TO schenker;
\N
\N
--
-- Name: TABLE _photo; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public._photo TO schenker;
\N
\N
--
-- Name: TABLE _property; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public._property TO schenker;
\N
\N
--
-- Name: TABLE _property_photos; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public._property_photos TO schenker;
\N
\N
--
-- Name: TABLE _user_property_fav; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public._user_property_fav TO schenker;
\N
\N
--
-- Name: TABLE auth_group; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public.auth_group TO andre;
GRANT ALL ON TABLE public.auth_group TO schenker;
\N
\N
--
-- Name: SEQUENCE auth_group_id_seq; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON SEQUENCE public.auth_group_id_seq TO andre;
GRANT ALL ON SEQUENCE public.auth_group_id_seq TO schenker;
\N
\N
--
-- Name: TABLE auth_group_permissions; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public.auth_group_permissions TO andre;
GRANT ALL ON TABLE public.auth_group_permissions TO schenker;
\N
\N
--
-- Name: SEQUENCE auth_group_permissions_id_seq; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON SEQUENCE public.auth_group_permissions_id_seq TO andre;
GRANT ALL ON SEQUENCE public.auth_group_permissions_id_seq TO schenker;
\N
\N
--
-- Name: TABLE auth_permission; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public.auth_permission TO andre;
GRANT ALL ON TABLE public.auth_permission TO schenker;
\N
\N
--
-- Name: SEQUENCE auth_permission_id_seq; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON SEQUENCE public.auth_permission_id_seq TO andre;
GRANT ALL ON SEQUENCE public.auth_permission_id_seq TO schenker;
\N
\N
--
-- Name: TABLE auth_user; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public.auth_user TO andre;
GRANT ALL ON TABLE public.auth_user TO schenker;
\N
\N
--
-- Name: TABLE auth_user_groups; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public.auth_user_groups TO andre;
GRANT ALL ON TABLE public.auth_user_groups TO schenker;
\N
\N
--
-- Name: SEQUENCE auth_user_groups_id_seq; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON SEQUENCE public.auth_user_groups_id_seq TO andre;
GRANT ALL ON SEQUENCE public.auth_user_groups_id_seq TO schenker;
\N
\N
--
-- Name: SEQUENCE auth_user_id_seq; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON SEQUENCE public.auth_user_id_seq TO andre;
GRANT ALL ON SEQUENCE public.auth_user_id_seq TO schenker;
\N
\N
--
-- Name: TABLE auth_user_user_permissions; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public.auth_user_user_permissions TO andre;
GRANT ALL ON TABLE public.auth_user_user_permissions TO schenker;
\N
\N
--
-- Name: SEQUENCE auth_user_user_permissions_id_seq; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON SEQUENCE public.auth_user_user_permissions_id_seq TO andre;
GRANT ALL ON SEQUENCE public.auth_user_user_permissions_id_seq TO schenker;
\N
\N
--
-- Name: TABLE device_metadata; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public.device_metadata TO andre;
GRANT ALL ON TABLE public.device_metadata TO schenker;
\N
\N
--
-- Name: TABLE django_admin_log; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public.django_admin_log TO andre;
GRANT ALL ON TABLE public.django_admin_log TO schenker;
\N
\N
--
-- Name: SEQUENCE django_admin_log_id_seq; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON SEQUENCE public.django_admin_log_id_seq TO andre;
GRANT ALL ON SEQUENCE public.django_admin_log_id_seq TO schenker;
\N
\N
--
-- Name: TABLE django_content_type; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public.django_content_type TO andre;
GRANT ALL ON TABLE public.django_content_type TO schenker;
\N
\N
--
-- Name: SEQUENCE django_content_type_id_seq; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON SEQUENCE public.django_content_type_id_seq TO andre;
GRANT ALL ON SEQUENCE public.django_content_type_id_seq TO schenker;
\N
\N
--
-- Name: TABLE django_migrations; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public.django_migrations TO andre;
GRANT ALL ON TABLE public.django_migrations TO schenker;
\N
\N
--
-- Name: SEQUENCE django_migrations_id_seq; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON SEQUENCE public.django_migrations_id_seq TO andre;
GRANT ALL ON SEQUENCE public.django_migrations_id_seq TO schenker;
\N
\N
--
-- Name: TABLE django_session; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public.django_session TO andre;
GRANT ALL ON TABLE public.django_session TO schenker;
\N
\N
--
-- Name: TABLE geography_columns; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public.geography_columns TO andre;
GRANT ALL ON TABLE public.geography_columns TO schenker;
\N
\N
--
-- Name: TABLE geometry_columns; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public.geometry_columns TO andre;
GRANT ALL ON TABLE public.geometry_columns TO schenker;
\N
\N
--
-- Name: SEQUENCE hibernate_sequence; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON SEQUENCE public.hibernate_sequence TO schenker;
\N
\N
--
-- Name: TABLE raster_columns; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public.raster_columns TO andre;
GRANT ALL ON TABLE public.raster_columns TO schenker;
\N
\N
--
-- Name: TABLE raster_overviews; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public.raster_overviews TO andre;
GRANT ALL ON TABLE public.raster_overviews TO schenker;
\N
\N
--
-- Name: TABLE read_marker; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public.read_marker TO schenker;
\N
\N
--
-- Name: SEQUENCE read_marker_id_seq; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON SEQUENCE public.read_marker_id_seq TO schenker;
\N
\N
--
-- Name: TABLE role; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public.role TO schenker;
\N
\N
--
-- Name: SEQUENCE role_id_seq; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON SEQUENCE public.role_id_seq TO schenker;
\N
\N
--
-- Name: TABLE spatial_ref_sys; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public.spatial_ref_sys TO andre;
GRANT ALL ON TABLE public.spatial_ref_sys TO schenker;
\N
\N
--
-- Name: TABLE spring_session; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public.spring_session TO andre;
GRANT ALL ON TABLE public.spring_session TO schenker;
\N
\N
--
-- Name: TABLE spring_session_attributes; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public.spring_session_attributes TO andre;
GRANT ALL ON TABLE public.spring_session_attributes TO schenker;
\N
\N
--
-- Name: TABLE user_roles; Type: ACL; Schema: public; Owner: -
--
\N
GRANT ALL ON TABLE public.user_roles TO schenker;
\N
\N
--
-- PostgreSQL database dump complete
--
\N
\.


--
-- Data for Name: _channel; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._channel (id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: _channel_user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._channel_user (channel_id, user_id) FROM stdin;
\.


--
-- Data for Name: _channel_users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._channel_users (channel_id, user_id) FROM stdin;
\.


--
-- Data for Name: _like; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._like (liked_username, sender_username, created_at, updated_at, l) FROM stdin;
\.


--
-- Data for Name: _listing; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._listing (id, created_at, updated_at, listing_status, propery_id) FROM stdin;
7	2020-01-28 18:33:50.757	2020-01-28 18:33:50.757	ACTIVE	2
12	2020-01-28 18:33:51.108	2020-01-28 18:33:51.108	ACTIVE	1
21	2020-01-28 18:33:55.989	2020-01-28 18:33:55.989	ACTIVE	13
29	2020-01-28 18:33:56.687	2020-01-28 18:33:56.687	ACTIVE	14
35	2020-01-28 18:34:00.133	2020-01-28 18:34:00.133	ACTIVE	30
41	2020-01-28 18:34:00.359	2020-01-28 18:34:00.359	ACTIVE	22
46	2020-01-28 18:34:02.432	2020-01-28 18:34:02.432	ACTIVE	43
53	2020-01-28 18:34:04.419	2020-01-28 18:34:04.419	ACTIVE	42
59	2020-01-28 18:34:05.365	2020-01-28 18:34:05.365	ACTIVE	47
66	2020-01-28 18:34:07.815	2020-01-28 18:34:07.815	ACTIVE	54
73	2020-01-28 18:34:09.047	2020-01-28 18:34:09.047	ACTIVE	60
78	2020-01-28 18:34:11.48	2020-01-28 18:34:11.48	ACTIVE	74
86	2020-01-28 18:34:12.026	2020-01-28 18:34:12.026	ACTIVE	67
91	2020-01-28 18:34:13.978	2020-01-28 18:34:13.978	ACTIVE	79
98	2020-01-28 18:34:15.562	2020-01-28 18:34:15.562	ACTIVE	87
105	2020-01-28 18:34:18.038	2020-01-28 18:34:18.038	ACTIVE	92
113	2020-01-28 18:34:19.071	2020-01-28 18:34:19.071	ACTIVE	99
118	2020-01-28 18:34:21.059	2020-01-28 18:34:21.059	ACTIVE	114
126	2020-01-28 18:34:21.255	2020-01-28 18:34:21.255	ACTIVE	106
131	2020-01-28 18:34:24.016	2020-01-28 18:34:24.016	ACTIVE	127
139	2020-01-28 18:34:24.696	2020-01-28 18:34:24.696	ACTIVE	119
145	2020-01-28 18:34:27.19	2020-01-28 18:34:27.19	ACTIVE	140
153	2020-01-28 18:34:27.624	2020-01-28 18:34:27.624	ACTIVE	132
158	2020-01-28 18:34:29.134	2020-01-28 18:34:29.134	ACTIVE	146
162	2020-01-28 18:34:30.717	2020-01-28 18:34:30.717	ACTIVE	159
170	2020-01-28 18:34:31.067	2020-01-28 18:34:31.067	ACTIVE	154
177	2020-01-28 18:34:33.513	2020-01-28 18:34:33.513	ACTIVE	163
185	2020-01-28 18:34:35.061	2020-01-28 18:34:35.061	ACTIVE	171
191	2020-01-28 18:34:35.651	2020-01-28 18:34:35.651	ACTIVE	178
196	2020-01-28 18:34:37.571	2020-01-28 18:34:37.571	ACTIVE	192
202	2020-01-28 18:34:37.685	2020-01-28 18:34:37.685	ACTIVE	186
210	2020-01-28 18:34:40.956	2020-01-28 18:34:40.956	ACTIVE	197
218	2020-01-28 18:34:41.264	2020-01-28 18:34:41.264	ACTIVE	203
222	2020-01-28 18:34:42.234	2020-01-28 18:34:42.234	ACTIVE	211
226	2020-01-28 18:34:43.501	2020-01-28 18:34:43.501	ACTIVE	223
233	2020-01-28 18:34:44	2020-01-28 18:34:44	ACTIVE	219
238	2020-01-28 18:34:45.236	2020-01-28 18:34:45.236	ACTIVE	227
245	2020-01-28 18:34:46.698	2020-01-28 18:34:46.698	ACTIVE	234
250	2020-01-28 18:34:47.042	2020-01-28 18:34:47.042	ACTIVE	239
256	2020-01-28 18:34:49.43	2020-01-28 18:34:49.43	ACTIVE	251
264	2020-01-28 18:34:50.386	2020-01-28 18:34:50.386	ACTIVE	246
268	2020-01-28 18:34:50.891	2020-01-28 18:34:50.891	ACTIVE	257
280	2020-01-28 18:34:54.326	2020-01-28 18:34:54.326	ACTIVE	265
282	2020-01-28 18:34:54.397	2020-01-28 18:34:54.397	ACTIVE	269
290	2020-01-28 18:34:57.215	2020-01-28 18:34:57.215	ACTIVE	283
298	2020-01-28 18:34:58.075	2020-01-28 18:34:58.075	ACTIVE	284
303	2020-01-28 18:35:00.051	2020-01-28 18:35:00.051	ACTIVE	299
311	2020-01-28 18:35:00.509	2020-01-28 18:35:00.509	ACTIVE	291
316	2020-01-28 18:35:01.867	2020-01-28 18:35:01.867	ACTIVE	304
322	2020-01-28 18:35:02.667	2020-01-28 18:35:02.667	ACTIVE	312
328	2020-01-28 18:35:04.375	2020-01-28 18:35:04.375	ACTIVE	317
339	2020-01-28 18:35:05.969	2020-01-28 18:35:05.969	ACTIVE	329
340	2020-01-28 18:35:05.991	2020-01-28 18:35:05.991	ACTIVE	323
345	2020-01-28 18:35:07.371	2020-01-28 18:35:07.371	ACTIVE	342
352	2020-01-28 18:35:09.366	2020-01-28 18:35:09.366	ACTIVE	341
359	2020-01-28 18:35:10.009	2020-01-28 18:35:10.009	ACTIVE	346
366	2020-01-28 18:35:12.565	2020-01-28 18:35:12.565	ACTIVE	353
374	2020-01-28 18:35:13.631	2020-01-28 18:35:13.631	ACTIVE	360
378	2020-01-28 18:35:14.872	2020-01-28 18:35:14.872	ACTIVE	375
385	2020-01-28 18:35:15.257	2020-01-28 18:35:15.257	ACTIVE	367
389	2020-01-28 18:35:15.873	2020-01-28 18:35:15.873	ACTIVE	379
393	2020-01-28 18:35:16.384	2020-01-28 18:35:16.384	ACTIVE	386
398	2020-01-28 18:35:17.612	2020-01-28 18:35:17.612	ACTIVE	390
403	2020-01-28 18:35:17.907	2020-01-28 18:35:17.907	ACTIVE	394
410	2020-01-28 18:35:20.313	2020-01-28 18:35:20.313	ACTIVE	399
418	2020-01-28 18:35:21.495	2020-01-28 18:35:21.495	ACTIVE	404
424	2020-01-28 18:35:22.506	2020-01-28 18:35:22.506	ACTIVE	411
429	2020-01-28 18:35:22.914	2020-01-28 18:35:22.914	ACTIVE	419
435	2020-01-28 18:35:24.402	2020-01-28 18:35:24.402	ACTIVE	425
439	2020-01-28 18:35:24.584	2020-01-28 18:35:24.584	ACTIVE	430
444	2020-01-28 18:35:25.733	2020-01-28 18:35:25.733	ACTIVE	440
451	2020-01-28 18:35:27.439	2020-01-28 18:35:27.439	ACTIVE	441
456	2020-01-28 18:35:28.767	2020-01-28 18:35:28.767	ACTIVE	445
463	2020-01-28 18:35:30.371	2020-01-28 18:35:30.371	ACTIVE	452
468	2020-01-28 18:35:30.638	2020-01-28 18:35:30.638	ACTIVE	457
475	2020-01-28 18:35:33.103	2020-01-28 18:35:33.103	ACTIVE	464
480	2020-01-28 18:35:33.246	2020-01-28 18:35:33.246	ACTIVE	469
486	2020-01-28 18:35:34.833	2020-01-28 18:35:34.833	ACTIVE	481
491	2020-01-28 18:35:36.319	2020-01-28 18:35:36.319	ACTIVE	487
498	2020-01-28 18:35:36.57	2020-01-28 18:35:36.57	ACTIVE	482
504	2020-01-28 18:35:38.591	2020-01-28 18:35:38.591	ACTIVE	499
510	2020-01-28 18:35:40.91	2020-01-28 18:35:40.91	ACTIVE	505
515	2020-01-28 18:35:42.419	2020-01-28 18:35:42.419	ACTIVE	511
519	2020-01-28 18:35:43.327	2020-01-28 18:35:43.327	ACTIVE	516
526	2020-01-28 18:35:46.293	2020-01-28 18:35:46.293	ACTIVE	520
531	2020-01-28 18:35:47.969	2020-01-28 18:35:47.969	ACTIVE	527
536	2020-01-28 18:35:49.625	2020-01-28 18:35:49.625	ACTIVE	532
543	2020-01-28 18:35:52.169	2020-01-28 18:35:52.169	ACTIVE	537
549	2020-01-28 18:35:54.343	2020-01-28 18:35:54.343	ACTIVE	544
557	2020-01-28 18:35:57.144	2020-01-28 18:35:57.144	ACTIVE	550
564	2020-01-28 18:35:59.657	2020-01-28 18:35:59.657	ACTIVE	558
\.


--
-- Data for Name: _message; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._message (id, created_at, updated_at, body, sender, subject, type, _channel_id, _sender_username) FROM stdin;
\.


--
-- Data for Name: _photo; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._photo (id, url, property_id, _user_id) FROM stdin;
\.


--
-- Data for Name: _photos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._photos (id, url, property_id, user_id) FROM stdin;
\.


--
-- Data for Name: _property; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._property (id, created_at, updated_at, address, city, country, description, loc, state, zip, _owner_id) FROM stdin;
2	2020-01-28 18:33:38.996	2020-01-28 18:33:38.996	2606 Jerald Manor	South Fredda	Western Sahara	\N	01010000201E690000FF99A0B0CD554340FDE255D8B1E25DC0	Minnesota	57700-2107	\N
1	2020-01-28 18:33:38.772	2020-01-28 18:33:38.772	404 Dickens Curve	Neryfort	New Caledonia	\N	01010000201E6900002EE808F799624240F43DBCB891F55BC0	Missouri	02326-4324	1000
13	2020-01-28 18:33:51.345	2020-01-28 18:33:51.345	19350 Stroman Extension	Rasheedaberg	Spain	\N	01010000201E69000091B9735B975343409787CBC536AA5CC0	Connecticut	06393	1000
14	2020-01-28 18:33:51.457	2020-01-28 18:33:51.457	641 Amado Lights	South Stacymouth	Reunion	\N	01010000201E690000FB59B2EF5E0D424049DB292870585CC0	Mississippi	70173	1002
22	2020-01-28 18:33:56.36	2020-01-28 18:33:56.36	59901 Willodean Ways	Trompshire	Tunisia	\N	01010000201E6900004056ACF4DA67404098E1C8A05BAD5DC0	Massachusetts	53217	\N
30	2020-01-28 18:33:57.029	2020-01-28 18:33:57.029	57518 Koch Dale	North Corneliusbury	Ethiopia	\N	01010000201E69000023406163BB9B4240B38405EEC7A75DC0	Connecticut	81137	1002
42	2020-01-28 18:34:00.535	2020-01-28 18:34:00.535	352 Fritsch Centers	Ethanfurt	Jamaica	\N	01010000201E6900004736BF0018C44040B48EBED0DA9C5CC0	Iowa	51088	\N
43	2020-01-28 18:34:00.695	2020-01-28 18:34:00.695	9351 Bruen Roads	East Chiafort	Gabon	\N	01010000201E690000AE57ECF1ECB73E40EA96566FADE75BC0	Maryland	81104-0736	1004
47	2020-01-28 18:34:02.536	2020-01-28 18:34:02.536	9638 Willms Forest	Lake Miguelland	Virgin Islands, British	\N	01010000201E6900005FC7A7B706B14040A29CE713AAF25DC0	New Jersey	61683	1004
54	2020-01-28 18:34:04.534	2020-01-28 18:34:04.534	9913 Horacio Inlet	Tamicaview	Haiti	\N	01010000201E690000A683BD0833B44040CFDE07DC63E25CC0	New Mexico	04019	\N
60	2020-01-28 18:34:05.925	2020-01-28 18:34:05.925	3085 Johns Land	New Fred	Mali	\N	01010000201E69000095BD645A19DC4240A2B2F6BD8BCC5BC0	North Dakota	14804	1005
67	2020-01-28 18:34:08.139	2020-01-28 18:34:08.139	2579 Rusty Springs	North Hipolito	Sri Lanka	\N	01010000201E6900008493E33C9AD241408D5F15FFD5135CC0	Utah	84877	\N
74	2020-01-28 18:34:09.137	2020-01-28 18:34:09.137	673 Moen Court	Kemmerstad	Sri Lanka	\N	01010000201E6900008D081C8E606A40404AF390E127D15DC0	Washington	16951-9122	1005
79	2020-01-28 18:34:11.582	2020-01-28 18:34:11.582	69360 Wolf Rapid	Schmittfurt	South Georgia and the South Sandwich Islands	\N	01010000201E690000DFCA9B909CCE4140A1BF85ACAB615CC0	North Dakota	01722-3339	1005
87	2020-01-28 18:34:12.328	2020-01-28 18:34:12.328	54005 Elroy Pike	Kihnton	Georgia	\N	01010000201E690000AE3CA2051F263F40BFFE3791F2FC5BC0	Florida	81865	\N
92	2020-01-28 18:34:14.578	2020-01-28 18:34:14.578	61905 Gregorio Lake	Jonahhaven	Turkey	\N	01010000201E690000369F6130A5854040AC6D31CA81CA5CC0	Alabama	63047	1007
99	2020-01-28 18:34:15.743	2020-01-28 18:34:15.743	0654 Wunsch Locks	Lake Mireillemouth	Djibouti	\N	01010000201E69000087D57B09B0633E40281DFAEB2FCB5BC0	Connecticut	21969-8475	\N
106	2020-01-28 18:34:18.112	2020-01-28 18:34:18.112	03063 Kuphal Flats	Port Patrick	Cocos (Keeling) Islands	\N	01010000201E690000E31CBB55422B434074F8834C9CA75DC0	North Dakota	09215	1007
114	2020-01-28 18:34:19.301	2020-01-28 18:34:19.301	566 Albert Ridge	East Winfordmouth	Cote d'Ivoire	\N	01010000201E690000DDD9A338AF31404001C3D4E101355CC0	Wyoming	99387	\N
119	2020-01-28 18:34:21.135	2020-01-28 18:34:21.135	003 Legros Summit	New James	Wallis and Futuna	\N	01010000201E690000AAC56491D2334040B14A7E3999165CC0	Florida	52992	\N
127	2020-01-28 18:34:21.648	2020-01-28 18:34:21.648	17986 Marvin Rue	Satterfieldstad	Guam	\N	01010000201E69000095EC3A96D2AA4340BE61FE2B28575DC0	Massachusetts	15925-9839	1009
132	2020-01-28 18:34:24.125	2020-01-28 18:34:24.125	2331 Dirk Islands	Port Lanellbury	Bermuda	\N	01010000201E690000F0B4256251874140F889563176845CC0	Georgia	94678-5053	1009
140	2020-01-28 18:34:24.804	2020-01-28 18:34:24.804	40083 Hoeger Coves	Lake Tyraport	Kiribati	\N	01010000201E690000545A2B66BB5C424024D66D39091D5CC0	Texas	11876	\N
146	2020-01-28 18:34:27.449	2020-01-28 18:34:27.449	9787 Johnathan Meadows	Lake Fermin	Guadeloupe	\N	01010000201E690000FE236011AD6A4140C85AA66BCA555DC0	Massachusetts	14028-0685	\N
154	2020-01-28 18:34:27.701	2020-01-28 18:34:27.701	60426 Shanita Meadow	Sabinaburgh	Maldives	\N	01010000201E6900007CDAB7E7159F42402ADCAF5C4D475DC0	Arizona	89377	1009
159	2020-01-28 18:34:29.349	2020-01-28 18:34:29.349	401 Octavia Crest	Beierburgh	Ethiopia	\N	01010000201E6900006029DEB618223E409AFD48E24B825CC0	Utah	96171	\N
163	2020-01-28 18:34:30.919	2020-01-28 18:34:30.919	88884 Cyrstal Locks	North Cecilechester	Saint Pierre and Miquelon	\N	01010000201E69000046D2237708853F4060C223A6F3B65CC0	Florida	20845	1012
171	2020-01-28 18:34:31.289	2020-01-28 18:34:31.289	107 Lebsack Mall	Paucekport	Rwanda	\N	01010000201E690000FF99C4F2A763414099DD0558E18E5BC0	Massachusetts	98835-1260	\N
178	2020-01-28 18:34:33.583	2020-01-28 18:34:33.583	373 Tillman Corner	Vincentmouth	Honduras	\N	01010000201E6900002D96AEF9467E4340EC8709883AB75CC0	Maryland	39448-4284	1012
186	2020-01-28 18:34:35.096	2020-01-28 18:34:35.096	69869 Booker Plains	Port Ray	Indonesia	\N	01010000201E6900003920CBA1BEA94040283F10CAFC425CC0	Texas	75964-5883	\N
192	2020-01-28 18:34:36.061	2020-01-28 18:34:36.061	0173 Marquitta Mountains	Baumbachchester	Bahrain	\N	01010000201E6900009CF87E5078AE41402D30401AD3A35BC0	Utah	41869-0662	1014
197	2020-01-28 18:34:37.611	2020-01-28 18:34:37.611	84429 Reichert Shoals	Lake Ramonitahaven	Burundi	\N	01010000201E690000209F69DE2C60404089C2B3191F8A5DC0	Arkansas	10780-9305	1014
203	2020-01-28 18:34:37.776	2020-01-28 18:34:37.776	3993 Bogisich Islands	West Claudio	Venezuela	\N	01010000201E690000BFCF6692E5B640400376090265C35BC0	Maine	07689	\N
211	2020-01-28 18:34:41.121	2020-01-28 18:34:41.121	05440 Pfeffer Manor	New Chrisbury	Lebanon	\N	01010000201E690000FA876507EDF8434061FCC7F1064A5DC0	Ohio	55101-1030	1015
219	2020-01-28 18:34:41.439	2020-01-28 18:34:41.439	03713 Runolfsdottir Light	Lake Valfurt	Virgin Islands, British	\N	01010000201E6900003CB1310A440F3F4098CCD0C8D2FE5CC0	Virginia	35907	\N
223	2020-01-28 18:34:42.308	2020-01-28 18:34:42.308	23007 Kshlerin Ports	McClureton	Cuba	\N	01010000201E690000ECCE2B20014240409147B67D00955DC0	Nevada	73592	1015
227	2020-01-28 18:34:43.702	2020-01-28 18:34:43.702	374 Wehner Valley	Legrosborough	Lebanon	\N	01010000201E690000B23AFD60A10E4140A7F8A90EB18D5DC0	Missouri	21197	1017
234	2020-01-28 18:34:44.05	2020-01-28 18:34:44.05	34859 Kling Freeway	North Keitha	El Salvador	\N	01010000201E690000DAE6E0F8ED4243402D54C64162D35CC0	Rhode Island	64281-2280	\N
239	2020-01-28 18:34:45.413	2020-01-28 18:34:45.413	2974 Rosenbaum Stravenue	Odisstad	Thailand	\N	01010000201E690000001A2B7CCCAB3E40E23C2F5FA6DE5CC0	Rhode Island	49220-4020	1018
246	2020-01-28 18:34:46.76	2020-01-28 18:34:46.76	80928 Toy Junctions	North Cherilyn	Costa Rica	\N	01010000201E690000BFB479B1B27A40407C17237BF6A25CC0	Louisiana	80932	\N
251	2020-01-28 18:34:47.101	2020-01-28 18:34:47.101	346 Renato Common	East Bambi	Israel	\N	01010000201E690000806EDF0F407541403CFD917E304F5DC0	Florida	81206	1018
257	2020-01-28 18:34:49.468	2020-01-28 18:34:49.468	2231 Luis Loop	Port Theodore	Cote d'Ivoire	\N	01010000201E690000B1B60E9CCA2441404C26B96E87BB5CC0	Illinois	67595	1018
265	2020-01-28 18:34:50.67	2020-01-28 18:34:50.67	987 Shavon Place	West Abram	Bermuda	\N	01010000201E690000A302C63DD7E74140CEA5659B47905DC0	South Dakota	97240	\N
269	2020-01-28 18:34:51.225	2020-01-28 18:34:51.225	37873 Jena Cliffs	Markusview	Russian Federation	\N	01010000201E6900000F71A66CEE3B4340F2A28972B7A85CC0	Idaho	85448-2758	1020
283	2020-01-28 18:34:54.396	2020-01-28 18:34:54.396	275 Shavon Landing	Emilberg	Sri Lanka	\N	01010000201E690000B045493B9095414071E5E29CA2D65BC0	Arkansas	49773-1027	\N
284	2020-01-28 18:34:54.497	2020-01-28 18:34:54.497	739 Randi Parkway	Thompsonbury	France	\N	01010000201E690000A511A1B73C2D3F40F346654E27F45CC0	Nebraska	06424-3827	1020
291	2020-01-28 18:34:57.391	2020-01-28 18:34:57.391	1136 Micheal Avenue	Marvinfurt	Timor-Leste	\N	01010000201E690000CA25241D8BC4434098BFA7073D7E5CC0	Vermont	89410-3468	\N
299	2020-01-28 18:34:58.121	2020-01-28 18:34:58.121	136 Sammy Oval	New Elliottstad	Tuvalu	\N	01010000201E69000034CCD63B89BF3E4011604D480B425DC0	Oklahoma	03580-6147	1020
304	2020-01-28 18:35:00.218	2020-01-28 18:35:00.218	52298 Bruce Plains	Lake Frederick	Argentina	\N	01010000201E690000D379AE1181A840406BC97B9CA1FC5BC0	California	16952-2505	1022
312	2020-01-28 18:35:00.545	2020-01-28 18:35:00.545	7295 Hilpert Walk	South Monte	Denmark	\N	01010000201E690000F640A63F7AEA424092ADD3A079FE5CC0	Arizona	65925-7801	\N
317	2020-01-28 18:35:02.044	2020-01-28 18:35:02.044	072 Gibson Drives	Jamilafort	Palestinian Territory	\N	01010000201E690000A11D75FE2A2841405A65C857897E5DC0	Tennessee	00624	1023
323	2020-01-28 18:35:02.8	2020-01-28 18:35:02.8	558 Schneider Squares	Weberburgh	American Samoa	\N	01010000201E69000053BDF33A9EAD3F402220C983C3DA5DC0	Alaska	54781	\N
329	2020-01-28 18:35:04.423	2020-01-28 18:35:04.423	8042 Runolfsson Motorway	Antoniaberg	Guam	\N	01010000201E690000AB73BB31344A434084C7A2AE4EF25CC0	Massachusetts	53094	1023
341	2020-01-28 18:35:06.282	2020-01-28 18:35:06.282	710 Doyle Path	North Sommer	Malaysia	\N	01010000201E6900005CCE9C008682434072B8DA92C3A95DC0	Connecticut	62569-8502	1024
342	2020-01-28 18:35:06.293	2020-01-28 18:35:06.293	3172 Hilll Pines	Conradfurt	Greenland	\N	01010000201E690000B9C7ADF21FE94240B04A5E7438045DC0	Tennessee	37984-7588	\N
346	2020-01-28 18:35:07.402	2020-01-28 18:35:07.402	2125 Chung Flats	Bernardostad	Sierra Leone	\N	01010000201E690000EA63A3A88492414043FFF742B2DB5CC0	Idaho	14268	\N
353	2020-01-28 18:35:09.428	2020-01-28 18:35:09.428	80339 Ankunding Garden	Mrazmouth	Canada	\N	01010000201E69000018C5D688D9094340EB1FD9F4B5635CC0	Nevada	35495-1445	1024
360	2020-01-28 18:35:10.264	2020-01-28 18:35:10.264	11964 Garland Shores	South Necole	Falkland Islands (Malvinas)	\N	01010000201E69000036BE1D947955404095B9D97F5EBB5CC0	Illinois	29533-0533	\N
367	2020-01-28 18:35:12.779	2020-01-28 18:35:12.779	567 Thompson Walks	South Federico	Dominica	\N	01010000201E69000006BCF6F55FC13F40B09B56CF50395DC0	Arizona	30426	1027
375	2020-01-28 18:35:13.671	2020-01-28 18:35:13.671	5145 Satterfield Street	Breitenbergtown	Macao	\N	01010000201E6900007250C8D446403E403B5667A620C55BC0	Wyoming	26719-2991	\N
379	2020-01-28 18:35:15.052	2020-01-28 18:35:15.052	330 Blanch Route	Lake Angele	Iraq	\N	01010000201E690000B2D81B03333C41403AA1D910FFC65BC0	Nebraska	57478	\N
386	2020-01-28 18:35:15.403	2020-01-28 18:35:15.403	526 McGlynn Route	Port Johnieville	Turkmenistan	\N	01010000201E690000081A096B44F3434025B01C498FFE5DC0	New York	46373-9873	1029
390	2020-01-28 18:35:16.09	2020-01-28 18:35:16.09	19082 Lucina Forks	North Jamalmouth	Western Sahara	\N	01010000201E6900006465EA35E1CF4240F5A23C4B99F45CC0	West Virginia	90605	\N
394	2020-01-28 18:35:16.412	2020-01-28 18:35:16.412	0772 Omer Pass	New Deana	San Marino	\N	01010000201E6900003472AC46FA1E414091EF54C09AEC5BC0	Alaska	76132-8093	1029
399	2020-01-28 18:35:17.832	2020-01-28 18:35:17.832	448 Yost Junctions	Alecchester	Lithuania	\N	01010000201E690000D25D0F208A434140367CA54FED645CC0	Maryland	71161	\N
404	2020-01-28 18:35:18.085	2020-01-28 18:35:18.085	556 Mohammad Mill	New Myrticestad	Belarus	\N	01010000201E6900002B8DBD5BC1F83F40BD677964E4C75DC0	Indiana	37195	1032
411	2020-01-28 18:35:20.39	2020-01-28 18:35:20.39	476 Bednar Track	Chinaland	Slovenia	\N	01010000201E6900002CAE45C39C70404031BFCC16E5AA5BC0	Illinois	71852	\N
419	2020-01-28 18:35:21.521	2020-01-28 18:35:21.521	72272 Shanta Island	New Mavis	Peru	\N	01010000201E6900001771C65380FB40404853FAA0D9955DC0	Wyoming	09168	1032
425	2020-01-28 18:35:22.534	2020-01-28 18:35:22.534	69153 Wilkinson Wells	Mickieland	Guinea-Bissau	\N	01010000201E6900001CBF6F6286F73E4032D3A44263675CC0	Connecticut	49076	\N
430	2020-01-28 18:35:23.126	2020-01-28 18:35:23.126	244 Tiesha Parkway	West Ressieside	Peru	\N	01010000201E690000F71DA47E184141402F3338A6C2985DC0	Virginia	83542	1033
440	2020-01-28 18:35:24.67	2020-01-28 18:35:24.67	477 Emard Drive	Stiedemannborough	South Georgia and the South Sandwich Islands	\N	01010000201E6900004E5A02E260474340B6778064F5B25DC0	Texas	47783	1033
441	2020-01-28 18:35:24.706	2020-01-28 18:35:24.706	884 Tegan Stravenue	East Hilton	Ghana	\N	01010000201E6900005E55243DB4134140EAAC2E60BFFE5BC0	California	94141-6684	\N
445	2020-01-28 18:35:26.052	2020-01-28 18:35:26.052	8777 Elbert Squares	Mackenzieland	Cameroon	\N	01010000201E69000058E5F290CD17404034FEDF41AF015DC0	Maine	04778-7400	1035
452	2020-01-28 18:35:27.493	2020-01-28 18:35:27.493	457 Marianna Village	New Michalemouth	French Southern Territories	\N	01010000201E690000650EF7745B3B4140381E90DF04B65DC0	Oklahoma	41092-6927	\N
457	2020-01-28 18:35:28.818	2020-01-28 18:35:28.818	1748 Glenn Roads	Herzogborough	Azerbaijan	\N	01010000201E6900000D20E48EE81E3F403FCC10BE512D5CC0	West Virginia	74768-1982	1035
464	2020-01-28 18:35:30.402	2020-01-28 18:35:30.402	8560 Nelia Plain	South Shonna	Hungary	\N	01010000201E690000058657997966434005F11CED7FC45CC0	Indiana	12425-5605	\N
469	2020-01-28 18:35:30.871	2020-01-28 18:35:30.871	90055 Tressa Green	Port Abdul	Wallis and Futuna	\N	01010000201E6900001977EA9D966E3E40576980EED4A85CC0	Colorado	02015	1036
481	2020-01-28 18:35:33.326	2020-01-28 18:35:33.326	8200 Hahn Stream	Marjoryhaven	Netherlands	\N	01010000201E69000053EF4F0B99ED4240D3566B32E0EC5CC0	Georgia	27605-2350	1036
482	2020-01-28 18:35:33.403	2020-01-28 18:35:33.403	0392 Michel Brooks	Fritschshire	Czech Republic	\N	01010000201E69000032D98FDD25483E407A21AC64DBAB5CC0	West Virginia	11778	\N
487	2020-01-28 18:35:34.913	2020-01-28 18:35:34.913	0840 Rivka Inlet	Krajcikmouth	Hong Kong	\N	01010000201E690000273EE7BC945B424087D961831CD95CC0	Kentucky	50390	1036
499	2020-01-28 18:35:36.619	2020-01-28 18:35:36.619	125 Donn Pike	Delberthaven	Christmas Island	\N	01010000201E690000897AA3FEFF4D4040DA6C80BE4E8A5BC0	Utah	26667	\N
505	2020-01-28 18:35:38.613	2020-01-28 18:35:38.613	856 Haag Viaduct	North Antonettaville	Myanmar	\N	01010000201E6900006D9C03CE76D34040ECC9DA53C2F65DC0	Montana	30108-5945	\N
511	2020-01-28 18:35:41.083	2020-01-28 18:35:41.083	71228 Hahn Turnpike	Stacialand	Bhutan	\N	01010000201E6900006DA07181988C4340D56027070D9F5DC0	Ohio	24116	\N
516	2020-01-28 18:35:42.45	2020-01-28 18:35:42.45	3623 Morar Crossing	Sipesfurt	Saint Helena	\N	01010000201E690000F458AC8501923F40FF67AB3EFCE05BC0	Utah	13602-7632	\N
520	2020-01-28 18:35:43.495	2020-01-28 18:35:43.495	3731 Bayer Viaduct	North Randolph	Republic of Korea	\N	01010000201E690000A487753DB7FE40404A645DC6978E5DC0	Montana	92414-0214	\N
527	2020-01-28 18:35:46.319	2020-01-28 18:35:46.319	743 Veola Brooks	Botsfordmouth	Micronesia	\N	01010000201E690000CC511DF4A1B03F40A74B3311B6CA5DC0	Delaware	23895-8122	\N
532	2020-01-28 18:35:48.123	2020-01-28 18:35:48.123	08688 Mante Spurs	Wilbertown	Cape Verde	\N	01010000201E6900002D12C523E3AC4140934CAA5276B85DC0	Louisiana	32940-8569	\N
537	2020-01-28 18:35:49.652	2020-01-28 18:35:49.652	92070 Colton Plains	East Carrolport	Luxembourg	\N	01010000201E6900003E2D881F504141404EA51105C1EC5DC0	South Carolina	95975-0744	\N
544	2020-01-28 18:35:52.306	2020-01-28 18:35:52.306	0118 Rowe Spur	South Reinaldoborough	Ethiopia	\N	01010000201E6900000B5D748311FA4140CBA89B81BCB65DC0	North Dakota	51880	\N
550	2020-01-28 18:35:54.391	2020-01-28 18:35:54.391	124 Janay Trail	Lake Jae	Montenegro	\N	01010000201E6900004895119845B74140427ACFB625CE5BC0	North Dakota	24214	\N
558	2020-01-28 18:35:57.188	2020-01-28 18:35:57.188	9208 Darlene Forest	Lake Lakenyahaven	Turks and Caicos Islands	\N	01010000201E6900001C226DC2731C43404D14558999BE5BC0	Kentucky	19240-3640	\N
565	2020-01-28 18:43:55.052	2020-01-28 18:43:55.652	1435 Homestead Rd, Santa Clara, CA 95050, USA	\N	\N	\N	01010000201E69000000000000000028400000000000004640	\N	\N	1042
566	2020-02-03 06:47:48.566	2020-02-03 06:47:49.198	1 World Way, Los Angeles, CA 90045, USA	\N	\N	\N	01010000201E69000000000000000028400000000000004640	\N	\N	1044
\.


--
-- Data for Name: _property_photos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._property_photos (id, created_at, updated_at, photo_url, property_id) FROM stdin;
3	2020-01-28 18:33:50.578	2020-01-28 18:33:50.578	https://storage.googleapis.com/photos3drs/2/3.png	2
4	2020-01-28 18:33:50.597	2020-01-28 18:33:50.597	https://storage.googleapis.com/photos3drs/2/5.png	2
5	2020-01-28 18:33:50.613	2020-01-28 18:33:50.613	https://storage.googleapis.com/photos3drs/2/3.png	2
6	2020-01-28 18:33:50.629	2020-01-28 18:33:50.629	https://storage.googleapis.com/photos3drs/2/1.png	2
8	2020-01-28 18:33:50.951	2020-01-28 18:33:50.951	https://storage.googleapis.com/photos3drs/1/3.png	1
9	2020-01-28 18:33:50.97	2020-01-28 18:33:50.97	https://storage.googleapis.com/photos3drs/1/1.png	1
10	2020-01-28 18:33:50.981	2020-01-28 18:33:50.981	https://storage.googleapis.com/photos3drs/1/5.png	1
11	2020-01-28 18:33:50.992	2020-01-28 18:33:50.992	https://storage.googleapis.com/photos3drs/1/2.png	1
15	2020-01-28 18:33:55.923	2020-01-28 18:33:55.923	https://storage.googleapis.com/photos3drs/13/5.png	13
16	2020-01-28 18:33:55.935	2020-01-28 18:33:55.935	https://storage.googleapis.com/photos3drs/13/2.png	13
17	2020-01-28 18:33:55.939	2020-01-28 18:33:55.939	https://storage.googleapis.com/photos3drs/13/4.png	13
18	2020-01-28 18:33:55.944	2020-01-28 18:33:55.944	https://storage.googleapis.com/photos3drs/13/1.png	13
19	2020-01-28 18:33:55.947	2020-01-28 18:33:55.947	https://storage.googleapis.com/photos3drs/13/2.png	13
20	2020-01-28 18:33:55.95	2020-01-28 18:33:55.95	https://storage.googleapis.com/photos3drs/13/3.png	13
23	2020-01-28 18:33:56.501	2020-01-28 18:33:56.501	https://storage.googleapis.com/photos3drs/14/5.png	14
24	2020-01-28 18:33:56.516	2020-01-28 18:33:56.516	https://storage.googleapis.com/photos3drs/14/2.png	14
25	2020-01-28 18:33:56.528	2020-01-28 18:33:56.528	https://storage.googleapis.com/photos3drs/14/2.png	14
26	2020-01-28 18:33:56.538	2020-01-28 18:33:56.538	https://storage.googleapis.com/photos3drs/14/1.png	14
27	2020-01-28 18:33:56.547	2020-01-28 18:33:56.547	https://storage.googleapis.com/photos3drs/14/4.png	14
28	2020-01-28 18:33:56.559	2020-01-28 18:33:56.559	https://storage.googleapis.com/photos3drs/14/3.png	14
31	2020-01-28 18:34:00.082	2020-01-28 18:34:00.082	https://storage.googleapis.com/photos3drs/30/4.png	30
32	2020-01-28 18:34:00.09	2020-01-28 18:34:00.09	https://storage.googleapis.com/photos3drs/30/2.png	30
33	2020-01-28 18:34:00.094	2020-01-28 18:34:00.094	https://storage.googleapis.com/photos3drs/30/1.png	30
34	2020-01-28 18:34:00.097	2020-01-28 18:34:00.097	https://storage.googleapis.com/photos3drs/30/2.png	30
36	2020-01-28 18:34:00.246	2020-01-28 18:34:00.246	https://storage.googleapis.com/photos3drs/22/4.png	22
37	2020-01-28 18:34:00.258	2020-01-28 18:34:00.258	https://storage.googleapis.com/photos3drs/22/2.png	22
38	2020-01-28 18:34:00.269	2020-01-28 18:34:00.269	https://storage.googleapis.com/photos3drs/22/5.png	22
39	2020-01-28 18:34:00.28	2020-01-28 18:34:00.28	https://storage.googleapis.com/photos3drs/22/3.png	22
40	2020-01-28 18:34:00.291	2020-01-28 18:34:00.291	https://storage.googleapis.com/photos3drs/22/2.png	22
44	2020-01-28 18:34:02.388	2020-01-28 18:34:02.388	https://storage.googleapis.com/photos3drs/43/3.png	43
45	2020-01-28 18:34:02.392	2020-01-28 18:34:02.392	https://storage.googleapis.com/photos3drs/43/4.png	43
48	2020-01-28 18:34:04.365	2020-01-28 18:34:04.365	https://storage.googleapis.com/photos3drs/42/5.png	42
49	2020-01-28 18:34:04.372	2020-01-28 18:34:04.372	https://storage.googleapis.com/photos3drs/42/5.png	42
50	2020-01-28 18:34:04.378	2020-01-28 18:34:04.378	https://storage.googleapis.com/photos3drs/42/1.png	42
51	2020-01-28 18:34:04.381	2020-01-28 18:34:04.381	https://storage.googleapis.com/photos3drs/42/2.png	42
52	2020-01-28 18:34:04.385	2020-01-28 18:34:04.385	https://storage.googleapis.com/photos3drs/42/5.png	42
55	2020-01-28 18:34:05.259	2020-01-28 18:34:05.259	https://storage.googleapis.com/photos3drs/47/4.png	47
56	2020-01-28 18:34:05.28	2020-01-28 18:34:05.28	https://storage.googleapis.com/photos3drs/47/2.png	47
57	2020-01-28 18:34:05.287	2020-01-28 18:34:05.287	https://storage.googleapis.com/photos3drs/47/2.png	47
58	2020-01-28 18:34:05.301	2020-01-28 18:34:05.301	https://storage.googleapis.com/photos3drs/47/4.png	47
61	2020-01-28 18:34:07.752	2020-01-28 18:34:07.752	https://storage.googleapis.com/photos3drs/54/4.png	54
62	2020-01-28 18:34:07.759	2020-01-28 18:34:07.759	https://storage.googleapis.com/photos3drs/54/2.png	54
63	2020-01-28 18:34:07.766	2020-01-28 18:34:07.766	https://storage.googleapis.com/photos3drs/54/4.png	54
64	2020-01-28 18:34:07.77	2020-01-28 18:34:07.77	https://storage.googleapis.com/photos3drs/54/1.png	54
65	2020-01-28 18:34:07.774	2020-01-28 18:34:07.774	https://storage.googleapis.com/photos3drs/54/1.png	54
68	2020-01-28 18:34:08.998	2020-01-28 18:34:08.998	https://storage.googleapis.com/photos3drs/60/5.png	60
69	2020-01-28 18:34:09.002	2020-01-28 18:34:09.002	https://storage.googleapis.com/photos3drs/60/2.png	60
70	2020-01-28 18:34:09.008	2020-01-28 18:34:09.008	https://storage.googleapis.com/photos3drs/60/3.png	60
71	2020-01-28 18:34:09.014	2020-01-28 18:34:09.014	https://storage.googleapis.com/photos3drs/60/2.png	60
72	2020-01-28 18:34:09.017	2020-01-28 18:34:09.017	https://storage.googleapis.com/photos3drs/60/1.png	60
75	2020-01-28 18:34:11.44	2020-01-28 18:34:11.44	https://storage.googleapis.com/photos3drs/74/2.png	74
76	2020-01-28 18:34:11.447	2020-01-28 18:34:11.447	https://storage.googleapis.com/photos3drs/74/4.png	74
77	2020-01-28 18:34:11.45	2020-01-28 18:34:11.45	https://storage.googleapis.com/photos3drs/74/1.png	74
80	2020-01-28 18:34:11.78	2020-01-28 18:34:11.78	https://storage.googleapis.com/photos3drs/67/4.png	67
81	2020-01-28 18:34:11.815	2020-01-28 18:34:11.815	https://storage.googleapis.com/photos3drs/67/2.png	67
82	2020-01-28 18:34:11.848	2020-01-28 18:34:11.848	https://storage.googleapis.com/photos3drs/67/1.png	67
83	2020-01-28 18:34:11.868	2020-01-28 18:34:11.868	https://storage.googleapis.com/photos3drs/67/1.png	67
84	2020-01-28 18:34:11.888	2020-01-28 18:34:11.888	https://storage.googleapis.com/photos3drs/67/3.png	67
85	2020-01-28 18:34:11.896	2020-01-28 18:34:11.896	https://storage.googleapis.com/photos3drs/67/5.png	67
88	2020-01-28 18:34:13.887	2020-01-28 18:34:13.887	https://storage.googleapis.com/photos3drs/79/5.png	79
89	2020-01-28 18:34:13.907	2020-01-28 18:34:13.907	https://storage.googleapis.com/photos3drs/79/1.png	79
90	2020-01-28 18:34:13.923	2020-01-28 18:34:13.923	https://storage.googleapis.com/photos3drs/79/4.png	79
93	2020-01-28 18:34:15.437	2020-01-28 18:34:15.437	https://storage.googleapis.com/photos3drs/87/2.png	87
94	2020-01-28 18:34:15.447	2020-01-28 18:34:15.447	https://storage.googleapis.com/photos3drs/87/2.png	87
95	2020-01-28 18:34:15.454	2020-01-28 18:34:15.454	https://storage.googleapis.com/photos3drs/87/2.png	87
96	2020-01-28 18:34:15.471	2020-01-28 18:34:15.471	https://storage.googleapis.com/photos3drs/87/2.png	87
97	2020-01-28 18:34:15.477	2020-01-28 18:34:15.477	https://storage.googleapis.com/photos3drs/87/3.png	87
100	2020-01-28 18:34:17.94	2020-01-28 18:34:17.94	https://storage.googleapis.com/photos3drs/92/3.png	92
101	2020-01-28 18:34:17.95	2020-01-28 18:34:17.95	https://storage.googleapis.com/photos3drs/92/2.png	92
102	2020-01-28 18:34:17.967	2020-01-28 18:34:17.967	https://storage.googleapis.com/photos3drs/92/5.png	92
103	2020-01-28 18:34:17.977	2020-01-28 18:34:17.977	https://storage.googleapis.com/photos3drs/92/3.png	92
104	2020-01-28 18:34:17.982	2020-01-28 18:34:17.982	https://storage.googleapis.com/photos3drs/92/3.png	92
120	2020-01-28 18:34:21.17	2020-01-28 18:34:21.17	https://storage.googleapis.com/photos3drs/106/2.png	106
121	2020-01-28 18:34:21.181	2020-01-28 18:34:21.181	https://storage.googleapis.com/photos3drs/106/2.png	106
122	2020-01-28 18:34:21.189	2020-01-28 18:34:21.189	https://storage.googleapis.com/photos3drs/106/3.png	106
123	2020-01-28 18:34:21.197	2020-01-28 18:34:21.197	https://storage.googleapis.com/photos3drs/106/5.png	106
124	2020-01-28 18:34:21.206	2020-01-28 18:34:21.206	https://storage.googleapis.com/photos3drs/106/3.png	106
125	2020-01-28 18:34:21.212	2020-01-28 18:34:21.212	https://storage.googleapis.com/photos3drs/106/1.png	106
128	2020-01-28 18:34:23.987	2020-01-28 18:34:23.987	https://storage.googleapis.com/photos3drs/127/1.png	127
129	2020-01-28 18:34:23.992	2020-01-28 18:34:23.992	https://storage.googleapis.com/photos3drs/127/5.png	127
130	2020-01-28 18:34:23.994	2020-01-28 18:34:23.994	https://storage.googleapis.com/photos3drs/127/5.png	127
147	2020-01-28 18:34:27.526	2020-01-28 18:34:27.526	https://storage.googleapis.com/photos3drs/132/2.png	132
148	2020-01-28 18:34:27.54	2020-01-28 18:34:27.54	https://storage.googleapis.com/photos3drs/132/2.png	132
149	2020-01-28 18:34:27.544	2020-01-28 18:34:27.544	https://storage.googleapis.com/photos3drs/132/3.png	132
150	2020-01-28 18:34:27.548	2020-01-28 18:34:27.548	https://storage.googleapis.com/photos3drs/132/3.png	132
151	2020-01-28 18:34:27.564	2020-01-28 18:34:27.564	https://storage.googleapis.com/photos3drs/132/5.png	132
152	2020-01-28 18:34:27.575	2020-01-28 18:34:27.575	https://storage.googleapis.com/photos3drs/132/4.png	132
164	2020-01-28 18:34:31.023	2020-01-28 18:34:31.023	https://storage.googleapis.com/photos3drs/154/1.png	154
165	2020-01-28 18:34:31.029	2020-01-28 18:34:31.029	https://storage.googleapis.com/photos3drs/154/4.png	154
166	2020-01-28 18:34:31.031	2020-01-28 18:34:31.031	https://storage.googleapis.com/photos3drs/154/1.png	154
167	2020-01-28 18:34:31.033	2020-01-28 18:34:31.033	https://storage.googleapis.com/photos3drs/154/3.png	154
168	2020-01-28 18:34:31.036	2020-01-28 18:34:31.036	https://storage.googleapis.com/photos3drs/154/5.png	154
169	2020-01-28 18:34:31.038	2020-01-28 18:34:31.038	https://storage.googleapis.com/photos3drs/154/2.png	154
179	2020-01-28 18:34:35.021	2020-01-28 18:34:35.021	https://storage.googleapis.com/photos3drs/171/5.png	171
180	2020-01-28 18:34:35.024	2020-01-28 18:34:35.024	https://storage.googleapis.com/photos3drs/171/5.png	171
181	2020-01-28 18:34:35.027	2020-01-28 18:34:35.027	https://storage.googleapis.com/photos3drs/171/1.png	171
182	2020-01-28 18:34:35.028	2020-01-28 18:34:35.028	https://storage.googleapis.com/photos3drs/171/4.png	171
183	2020-01-28 18:34:35.031	2020-01-28 18:34:35.031	https://storage.googleapis.com/photos3drs/171/5.png	171
184	2020-01-28 18:34:35.033	2020-01-28 18:34:35.033	https://storage.googleapis.com/photos3drs/171/3.png	171
198	2020-01-28 18:34:37.624	2020-01-28 18:34:37.624	https://storage.googleapis.com/photos3drs/186/2.png	186
199	2020-01-28 18:34:37.636	2020-01-28 18:34:37.636	https://storage.googleapis.com/photos3drs/186/4.png	186
200	2020-01-28 18:34:37.642	2020-01-28 18:34:37.642	https://storage.googleapis.com/photos3drs/186/1.png	186
201	2020-01-28 18:34:37.646	2020-01-28 18:34:37.646	https://storage.googleapis.com/photos3drs/186/5.png	186
212	2020-01-28 18:34:41.226	2020-01-28 18:34:41.226	https://storage.googleapis.com/photos3drs/203/3.png	203
213	2020-01-28 18:34:41.23	2020-01-28 18:34:41.23	https://storage.googleapis.com/photos3drs/203/4.png	203
214	2020-01-28 18:34:41.232	2020-01-28 18:34:41.232	https://storage.googleapis.com/photos3drs/203/4.png	203
215	2020-01-28 18:34:41.233	2020-01-28 18:34:41.233	https://storage.googleapis.com/photos3drs/203/3.png	203
216	2020-01-28 18:34:41.235	2020-01-28 18:34:41.235	https://storage.googleapis.com/photos3drs/203/1.png	203
217	2020-01-28 18:34:41.236	2020-01-28 18:34:41.236	https://storage.googleapis.com/photos3drs/203/1.png	203
228	2020-01-28 18:34:43.951	2020-01-28 18:34:43.951	https://storage.googleapis.com/photos3drs/219/3.png	219
229	2020-01-28 18:34:43.955	2020-01-28 18:34:43.955	https://storage.googleapis.com/photos3drs/219/3.png	219
230	2020-01-28 18:34:43.963	2020-01-28 18:34:43.963	https://storage.googleapis.com/photos3drs/219/4.png	219
231	2020-01-28 18:34:43.965	2020-01-28 18:34:43.965	https://storage.googleapis.com/photos3drs/219/2.png	219
232	2020-01-28 18:34:43.973	2020-01-28 18:34:43.973	https://storage.googleapis.com/photos3drs/219/5.png	219
240	2020-01-28 18:34:46.652	2020-01-28 18:34:46.652	https://storage.googleapis.com/photos3drs/234/3.png	234
241	2020-01-28 18:34:46.655	2020-01-28 18:34:46.655	https://storage.googleapis.com/photos3drs/234/3.png	234
242	2020-01-28 18:34:46.658	2020-01-28 18:34:46.658	https://storage.googleapis.com/photos3drs/234/1.png	234
243	2020-01-28 18:34:46.661	2020-01-28 18:34:46.661	https://storage.googleapis.com/photos3drs/234/5.png	234
244	2020-01-28 18:34:46.667	2020-01-28 18:34:46.667	https://storage.googleapis.com/photos3drs/234/4.png	234
258	2020-01-28 18:34:50.271	2020-01-28 18:34:50.271	https://storage.googleapis.com/photos3drs/246/5.png	246
259	2020-01-28 18:34:50.282	2020-01-28 18:34:50.282	https://storage.googleapis.com/photos3drs/246/5.png	246
260	2020-01-28 18:34:50.288	2020-01-28 18:34:50.288	https://storage.googleapis.com/photos3drs/246/5.png	246
261	2020-01-28 18:34:50.297	2020-01-28 18:34:50.297	https://storage.googleapis.com/photos3drs/246/5.png	246
262	2020-01-28 18:34:50.305	2020-01-28 18:34:50.305	https://storage.googleapis.com/photos3drs/246/3.png	246
263	2020-01-28 18:34:50.311	2020-01-28 18:34:50.311	https://storage.googleapis.com/photos3drs/246/2.png	246
270	2020-01-28 18:34:54.27	2020-01-28 18:34:54.27	https://storage.googleapis.com/photos3drs/265/2.png	265
271	2020-01-28 18:34:54.273	2020-01-28 18:34:54.273	https://storage.googleapis.com/photos3drs/265/4.png	265
272	2020-01-28 18:34:54.275	2020-01-28 18:34:54.275	https://storage.googleapis.com/photos3drs/265/4.png	265
273	2020-01-28 18:34:54.277	2020-01-28 18:34:54.277	https://storage.googleapis.com/photos3drs/265/2.png	265
274	2020-01-28 18:34:54.284	2020-01-28 18:34:54.284	https://storage.googleapis.com/photos3drs/265/3.png	265
275	2020-01-28 18:34:54.287	2020-01-28 18:34:54.287	https://storage.googleapis.com/photos3drs/265/5.png	265
285	2020-01-28 18:34:57.183	2020-01-28 18:34:57.183	https://storage.googleapis.com/photos3drs/283/4.png	283
286	2020-01-28 18:34:57.186	2020-01-28 18:34:57.186	https://storage.googleapis.com/photos3drs/283/4.png	283
287	2020-01-28 18:34:57.189	2020-01-28 18:34:57.189	https://storage.googleapis.com/photos3drs/283/1.png	283
288	2020-01-28 18:34:57.19	2020-01-28 18:34:57.19	https://storage.googleapis.com/photos3drs/283/5.png	283
289	2020-01-28 18:34:57.192	2020-01-28 18:34:57.192	https://storage.googleapis.com/photos3drs/283/2.png	283
305	2020-01-28 18:35:00.455	2020-01-28 18:35:00.455	https://storage.googleapis.com/photos3drs/291/1.png	291
306	2020-01-28 18:35:00.459	2020-01-28 18:35:00.459	https://storage.googleapis.com/photos3drs/291/5.png	291
307	2020-01-28 18:35:00.462	2020-01-28 18:35:00.462	https://storage.googleapis.com/photos3drs/291/2.png	291
308	2020-01-28 18:35:00.464	2020-01-28 18:35:00.464	https://storage.googleapis.com/photos3drs/291/2.png	291
107	2020-01-28 18:34:19.001	2020-01-28 18:34:19.001	https://storage.googleapis.com/photos3drs/99/1.png	99
108	2020-01-28 18:34:19.005	2020-01-28 18:34:19.005	https://storage.googleapis.com/photos3drs/99/3.png	99
109	2020-01-28 18:34:19.01	2020-01-28 18:34:19.01	https://storage.googleapis.com/photos3drs/99/5.png	99
110	2020-01-28 18:34:19.013	2020-01-28 18:34:19.013	https://storage.googleapis.com/photos3drs/99/4.png	99
111	2020-01-28 18:34:19.017	2020-01-28 18:34:19.017	https://storage.googleapis.com/photos3drs/99/3.png	99
112	2020-01-28 18:34:19.021	2020-01-28 18:34:19.021	https://storage.googleapis.com/photos3drs/99/3.png	99
115	2020-01-28 18:34:21.021	2020-01-28 18:34:21.021	https://storage.googleapis.com/photos3drs/114/4.png	114
116	2020-01-28 18:34:21.025	2020-01-28 18:34:21.025	https://storage.googleapis.com/photos3drs/114/4.png	114
117	2020-01-28 18:34:21.029	2020-01-28 18:34:21.029	https://storage.googleapis.com/photos3drs/114/3.png	114
133	2020-01-28 18:34:24.613	2020-01-28 18:34:24.613	https://storage.googleapis.com/photos3drs/119/1.png	119
134	2020-01-28 18:34:24.616	2020-01-28 18:34:24.616	https://storage.googleapis.com/photos3drs/119/1.png	119
135	2020-01-28 18:34:24.619	2020-01-28 18:34:24.619	https://storage.googleapis.com/photos3drs/119/1.png	119
136	2020-01-28 18:34:24.622	2020-01-28 18:34:24.622	https://storage.googleapis.com/photos3drs/119/2.png	119
137	2020-01-28 18:34:24.625	2020-01-28 18:34:24.625	https://storage.googleapis.com/photos3drs/119/5.png	119
138	2020-01-28 18:34:24.63	2020-01-28 18:34:24.63	https://storage.googleapis.com/photos3drs/119/2.png	119
141	2020-01-28 18:34:27.144	2020-01-28 18:34:27.144	https://storage.googleapis.com/photos3drs/140/5.png	140
142	2020-01-28 18:34:27.152	2020-01-28 18:34:27.152	https://storage.googleapis.com/photos3drs/140/2.png	140
143	2020-01-28 18:34:27.155	2020-01-28 18:34:27.155	https://storage.googleapis.com/photos3drs/140/3.png	140
144	2020-01-28 18:34:27.162	2020-01-28 18:34:27.162	https://storage.googleapis.com/photos3drs/140/4.png	140
155	2020-01-28 18:34:29.099	2020-01-28 18:34:29.099	https://storage.googleapis.com/photos3drs/146/5.png	146
156	2020-01-28 18:34:29.102	2020-01-28 18:34:29.102	https://storage.googleapis.com/photos3drs/146/2.png	146
157	2020-01-28 18:34:29.104	2020-01-28 18:34:29.104	https://storage.googleapis.com/photos3drs/146/2.png	146
160	2020-01-28 18:34:30.688	2020-01-28 18:34:30.688	https://storage.googleapis.com/photos3drs/159/2.png	159
161	2020-01-28 18:34:30.697	2020-01-28 18:34:30.697	https://storage.googleapis.com/photos3drs/159/4.png	159
172	2020-01-28 18:34:33.461	2020-01-28 18:34:33.461	https://storage.googleapis.com/photos3drs/163/3.png	163
173	2020-01-28 18:34:33.463	2020-01-28 18:34:33.463	https://storage.googleapis.com/photos3drs/163/5.png	163
174	2020-01-28 18:34:33.471	2020-01-28 18:34:33.471	https://storage.googleapis.com/photos3drs/163/2.png	163
175	2020-01-28 18:34:33.475	2020-01-28 18:34:33.475	https://storage.googleapis.com/photos3drs/163/2.png	163
176	2020-01-28 18:34:33.478	2020-01-28 18:34:33.478	https://storage.googleapis.com/photos3drs/163/1.png	163
187	2020-01-28 18:34:35.618	2020-01-28 18:34:35.618	https://storage.googleapis.com/photos3drs/178/1.png	178
188	2020-01-28 18:34:35.622	2020-01-28 18:34:35.622	https://storage.googleapis.com/photos3drs/178/3.png	178
189	2020-01-28 18:34:35.625	2020-01-28 18:34:35.625	https://storage.googleapis.com/photos3drs/178/2.png	178
190	2020-01-28 18:34:35.63	2020-01-28 18:34:35.63	https://storage.googleapis.com/photos3drs/178/2.png	178
193	2020-01-28 18:34:37.551	2020-01-28 18:34:37.551	https://storage.googleapis.com/photos3drs/192/3.png	192
194	2020-01-28 18:34:37.554	2020-01-28 18:34:37.554	https://storage.googleapis.com/photos3drs/192/3.png	192
195	2020-01-28 18:34:37.556	2020-01-28 18:34:37.556	https://storage.googleapis.com/photos3drs/192/2.png	192
204	2020-01-28 18:34:40.904	2020-01-28 18:34:40.904	https://storage.googleapis.com/photos3drs/197/1.png	197
205	2020-01-28 18:34:40.908	2020-01-28 18:34:40.908	https://storage.googleapis.com/photos3drs/197/3.png	197
206	2020-01-28 18:34:40.915	2020-01-28 18:34:40.915	https://storage.googleapis.com/photos3drs/197/3.png	197
207	2020-01-28 18:34:40.922	2020-01-28 18:34:40.922	https://storage.googleapis.com/photos3drs/197/5.png	197
208	2020-01-28 18:34:40.926	2020-01-28 18:34:40.926	https://storage.googleapis.com/photos3drs/197/4.png	197
209	2020-01-28 18:34:40.928	2020-01-28 18:34:40.928	https://storage.googleapis.com/photos3drs/197/1.png	197
220	2020-01-28 18:34:42.208	2020-01-28 18:34:42.208	https://storage.googleapis.com/photos3drs/211/2.png	211
221	2020-01-28 18:34:42.215	2020-01-28 18:34:42.215	https://storage.googleapis.com/photos3drs/211/2.png	211
224	2020-01-28 18:34:43.456	2020-01-28 18:34:43.456	https://storage.googleapis.com/photos3drs/223/3.png	223
225	2020-01-28 18:34:43.461	2020-01-28 18:34:43.461	https://storage.googleapis.com/photos3drs/223/5.png	223
235	2020-01-28 18:34:45.205	2020-01-28 18:34:45.205	https://storage.googleapis.com/photos3drs/227/4.png	227
236	2020-01-28 18:34:45.211	2020-01-28 18:34:45.211	https://storage.googleapis.com/photos3drs/227/1.png	227
237	2020-01-28 18:34:45.213	2020-01-28 18:34:45.213	https://storage.googleapis.com/photos3drs/227/2.png	227
247	2020-01-28 18:34:47.022	2020-01-28 18:34:47.022	https://storage.googleapis.com/photos3drs/239/3.png	239
248	2020-01-28 18:34:47.026	2020-01-28 18:34:47.026	https://storage.googleapis.com/photos3drs/239/5.png	239
249	2020-01-28 18:34:47.028	2020-01-28 18:34:47.028	https://storage.googleapis.com/photos3drs/239/3.png	239
252	2020-01-28 18:34:49.404	2020-01-28 18:34:49.404	https://storage.googleapis.com/photos3drs/251/5.png	251
253	2020-01-28 18:34:49.409	2020-01-28 18:34:49.409	https://storage.googleapis.com/photos3drs/251/5.png	251
254	2020-01-28 18:34:49.413	2020-01-28 18:34:49.413	https://storage.googleapis.com/photos3drs/251/1.png	251
255	2020-01-28 18:34:49.415	2020-01-28 18:34:49.415	https://storage.googleapis.com/photos3drs/251/2.png	251
266	2020-01-28 18:34:50.866	2020-01-28 18:34:50.866	https://storage.googleapis.com/photos3drs/257/4.png	257
267	2020-01-28 18:34:50.871	2020-01-28 18:34:50.871	https://storage.googleapis.com/photos3drs/257/4.png	257
276	2020-01-28 18:34:54.306	2020-01-28 18:34:54.306	https://storage.googleapis.com/photos3drs/269/5.png	269
277	2020-01-28 18:34:54.316	2020-01-28 18:34:54.316	https://storage.googleapis.com/photos3drs/269/4.png	269
278	2020-01-28 18:34:54.321	2020-01-28 18:34:54.321	https://storage.googleapis.com/photos3drs/269/2.png	269
279	2020-01-28 18:34:54.328	2020-01-28 18:34:54.328	https://storage.googleapis.com/photos3drs/269/3.png	269
281	2020-01-28 18:34:54.335	2020-01-28 18:34:54.335	https://storage.googleapis.com/photos3drs/269/5.png	269
292	2020-01-28 18:34:58.039	2020-01-28 18:34:58.039	https://storage.googleapis.com/photos3drs/284/1.png	284
293	2020-01-28 18:34:58.043	2020-01-28 18:34:58.043	https://storage.googleapis.com/photos3drs/284/5.png	284
294	2020-01-28 18:34:58.046	2020-01-28 18:34:58.046	https://storage.googleapis.com/photos3drs/284/5.png	284
295	2020-01-28 18:34:58.048	2020-01-28 18:34:58.048	https://storage.googleapis.com/photos3drs/284/3.png	284
296	2020-01-28 18:34:58.049	2020-01-28 18:34:58.049	https://storage.googleapis.com/photos3drs/284/4.png	284
297	2020-01-28 18:34:58.051	2020-01-28 18:34:58.051	https://storage.googleapis.com/photos3drs/284/5.png	284
300	2020-01-28 18:34:59.999	2020-01-28 18:34:59.999	https://storage.googleapis.com/photos3drs/299/1.png	299
301	2020-01-28 18:35:00.009	2020-01-28 18:35:00.009	https://storage.googleapis.com/photos3drs/299/2.png	299
302	2020-01-28 18:35:00.015	2020-01-28 18:35:00.015	https://storage.googleapis.com/photos3drs/299/4.png	299
313	2020-01-28 18:35:01.846	2020-01-28 18:35:01.846	https://storage.googleapis.com/photos3drs/304/1.png	304
314	2020-01-28 18:35:01.848	2020-01-28 18:35:01.848	https://storage.googleapis.com/photos3drs/304/1.png	304
315	2020-01-28 18:35:01.852	2020-01-28 18:35:01.852	https://storage.googleapis.com/photos3drs/304/2.png	304
324	2020-01-28 18:35:04.34	2020-01-28 18:35:04.34	https://storage.googleapis.com/photos3drs/317/3.png	317
325	2020-01-28 18:35:04.343	2020-01-28 18:35:04.343	https://storage.googleapis.com/photos3drs/317/5.png	317
326	2020-01-28 18:35:04.345	2020-01-28 18:35:04.345	https://storage.googleapis.com/photos3drs/317/5.png	317
327	2020-01-28 18:35:04.349	2020-01-28 18:35:04.349	https://storage.googleapis.com/photos3drs/317/2.png	317
309	2020-01-28 18:35:00.471	2020-01-28 18:35:00.471	https://storage.googleapis.com/photos3drs/291/5.png	291
310	2020-01-28 18:35:00.484	2020-01-28 18:35:00.484	https://storage.googleapis.com/photos3drs/291/2.png	291
318	2020-01-28 18:35:02.585	2020-01-28 18:35:02.585	https://storage.googleapis.com/photos3drs/312/5.png	312
319	2020-01-28 18:35:02.589	2020-01-28 18:35:02.589	https://storage.googleapis.com/photos3drs/312/1.png	312
320	2020-01-28 18:35:02.593	2020-01-28 18:35:02.593	https://storage.googleapis.com/photos3drs/312/3.png	312
321	2020-01-28 18:35:02.6	2020-01-28 18:35:02.6	https://storage.googleapis.com/photos3drs/312/4.png	312
330	2020-01-28 18:35:05.904	2020-01-28 18:35:05.904	https://storage.googleapis.com/photos3drs/323/4.png	323
334	2020-01-28 18:35:05.93	2020-01-28 18:35:05.93	https://storage.googleapis.com/photos3drs/329/3.png	329
331	2020-01-28 18:35:05.915	2020-01-28 18:35:05.915	https://storage.googleapis.com/photos3drs/323/3.png	323
337	2020-01-28 18:35:05.934	2020-01-28 18:35:05.934	https://storage.googleapis.com/photos3drs/329/3.png	329
338	2020-01-28 18:35:05.939	2020-01-28 18:35:05.939	https://storage.googleapis.com/photos3drs/329/3.png	329
332	2020-01-28 18:35:05.918	2020-01-28 18:35:05.918	https://storage.googleapis.com/photos3drs/323/4.png	323
333	2020-01-28 18:35:05.922	2020-01-28 18:35:05.922	https://storage.googleapis.com/photos3drs/323/2.png	323
335	2020-01-28 18:35:05.928	2020-01-28 18:35:05.928	https://storage.googleapis.com/photos3drs/323/1.png	323
336	2020-01-28 18:35:05.933	2020-01-28 18:35:05.933	https://storage.googleapis.com/photos3drs/323/2.png	323
343	2020-01-28 18:35:07.352	2020-01-28 18:35:07.352	https://storage.googleapis.com/photos3drs/342/1.png	342
344	2020-01-28 18:35:07.357	2020-01-28 18:35:07.357	https://storage.googleapis.com/photos3drs/342/4.png	342
347	2020-01-28 18:35:09.336	2020-01-28 18:35:09.336	https://storage.googleapis.com/photos3drs/341/2.png	341
348	2020-01-28 18:35:09.342	2020-01-28 18:35:09.342	https://storage.googleapis.com/photos3drs/341/4.png	341
349	2020-01-28 18:35:09.346	2020-01-28 18:35:09.346	https://storage.googleapis.com/photos3drs/341/1.png	341
350	2020-01-28 18:35:09.349	2020-01-28 18:35:09.349	https://storage.googleapis.com/photos3drs/341/4.png	341
351	2020-01-28 18:35:09.351	2020-01-28 18:35:09.351	https://storage.googleapis.com/photos3drs/341/4.png	341
354	2020-01-28 18:35:09.959	2020-01-28 18:35:09.959	https://storage.googleapis.com/photos3drs/346/2.png	346
355	2020-01-28 18:35:09.963	2020-01-28 18:35:09.963	https://storage.googleapis.com/photos3drs/346/2.png	346
356	2020-01-28 18:35:09.974	2020-01-28 18:35:09.974	https://storage.googleapis.com/photos3drs/346/2.png	346
357	2020-01-28 18:35:09.981	2020-01-28 18:35:09.981	https://storage.googleapis.com/photos3drs/346/4.png	346
358	2020-01-28 18:35:09.985	2020-01-28 18:35:09.985	https://storage.googleapis.com/photos3drs/346/5.png	346
361	2020-01-28 18:35:12.526	2020-01-28 18:35:12.526	https://storage.googleapis.com/photos3drs/353/3.png	353
362	2020-01-28 18:35:12.529	2020-01-28 18:35:12.529	https://storage.googleapis.com/photos3drs/353/4.png	353
363	2020-01-28 18:35:12.536	2020-01-28 18:35:12.536	https://storage.googleapis.com/photos3drs/353/5.png	353
364	2020-01-28 18:35:12.539	2020-01-28 18:35:12.539	https://storage.googleapis.com/photos3drs/353/3.png	353
365	2020-01-28 18:35:12.542	2020-01-28 18:35:12.542	https://storage.googleapis.com/photos3drs/353/4.png	353
368	2020-01-28 18:35:13.585	2020-01-28 18:35:13.585	https://storage.googleapis.com/photos3drs/360/4.png	360
369	2020-01-28 18:35:13.588	2020-01-28 18:35:13.588	https://storage.googleapis.com/photos3drs/360/1.png	360
370	2020-01-28 18:35:13.589	2020-01-28 18:35:13.589	https://storage.googleapis.com/photos3drs/360/5.png	360
371	2020-01-28 18:35:13.591	2020-01-28 18:35:13.591	https://storage.googleapis.com/photos3drs/360/1.png	360
372	2020-01-28 18:35:13.599	2020-01-28 18:35:13.599	https://storage.googleapis.com/photos3drs/360/1.png	360
373	2020-01-28 18:35:13.605	2020-01-28 18:35:13.605	https://storage.googleapis.com/photos3drs/360/3.png	360
376	2020-01-28 18:35:14.845	2020-01-28 18:35:14.845	https://storage.googleapis.com/photos3drs/375/2.png	375
377	2020-01-28 18:35:14.848	2020-01-28 18:35:14.848	https://storage.googleapis.com/photos3drs/375/5.png	375
380	2020-01-28 18:35:15.223	2020-01-28 18:35:15.223	https://storage.googleapis.com/photos3drs/367/1.png	367
381	2020-01-28 18:35:15.227	2020-01-28 18:35:15.227	https://storage.googleapis.com/photos3drs/367/3.png	367
382	2020-01-28 18:35:15.23	2020-01-28 18:35:15.23	https://storage.googleapis.com/photos3drs/367/1.png	367
383	2020-01-28 18:35:15.233	2020-01-28 18:35:15.233	https://storage.googleapis.com/photos3drs/367/5.png	367
384	2020-01-28 18:35:15.236	2020-01-28 18:35:15.236	https://storage.googleapis.com/photos3drs/367/5.png	367
387	2020-01-28 18:35:15.849	2020-01-28 18:35:15.849	https://storage.googleapis.com/photos3drs/379/3.png	379
388	2020-01-28 18:35:15.854	2020-01-28 18:35:15.854	https://storage.googleapis.com/photos3drs/379/2.png	379
391	2020-01-28 18:35:16.372	2020-01-28 18:35:16.372	https://storage.googleapis.com/photos3drs/386/2.png	386
392	2020-01-28 18:35:16.374	2020-01-28 18:35:16.374	https://storage.googleapis.com/photos3drs/386/3.png	386
395	2020-01-28 18:35:17.596	2020-01-28 18:35:17.596	https://storage.googleapis.com/photos3drs/390/5.png	390
396	2020-01-28 18:35:17.598	2020-01-28 18:35:17.598	https://storage.googleapis.com/photos3drs/390/1.png	390
397	2020-01-28 18:35:17.6	2020-01-28 18:35:17.6	https://storage.googleapis.com/photos3drs/390/2.png	390
400	2020-01-28 18:35:17.864	2020-01-28 18:35:17.864	https://storage.googleapis.com/photos3drs/394/2.png	394
401	2020-01-28 18:35:17.868	2020-01-28 18:35:17.868	https://storage.googleapis.com/photos3drs/394/3.png	394
402	2020-01-28 18:35:17.871	2020-01-28 18:35:17.871	https://storage.googleapis.com/photos3drs/394/3.png	394
405	2020-01-28 18:35:20.279	2020-01-28 18:35:20.279	https://storage.googleapis.com/photos3drs/399/2.png	399
406	2020-01-28 18:35:20.28	2020-01-28 18:35:20.28	https://storage.googleapis.com/photos3drs/399/1.png	399
407	2020-01-28 18:35:20.282	2020-01-28 18:35:20.282	https://storage.googleapis.com/photos3drs/399/2.png	399
408	2020-01-28 18:35:20.283	2020-01-28 18:35:20.283	https://storage.googleapis.com/photos3drs/399/4.png	399
409	2020-01-28 18:35:20.285	2020-01-28 18:35:20.285	https://storage.googleapis.com/photos3drs/399/2.png	399
412	2020-01-28 18:35:21.464	2020-01-28 18:35:21.464	https://storage.googleapis.com/photos3drs/404/5.png	404
413	2020-01-28 18:35:21.467	2020-01-28 18:35:21.467	https://storage.googleapis.com/photos3drs/404/4.png	404
414	2020-01-28 18:35:21.469	2020-01-28 18:35:21.469	https://storage.googleapis.com/photos3drs/404/5.png	404
415	2020-01-28 18:35:21.472	2020-01-28 18:35:21.472	https://storage.googleapis.com/photos3drs/404/3.png	404
416	2020-01-28 18:35:21.474	2020-01-28 18:35:21.474	https://storage.googleapis.com/photos3drs/404/5.png	404
417	2020-01-28 18:35:21.475	2020-01-28 18:35:21.475	https://storage.googleapis.com/photos3drs/404/4.png	404
420	2020-01-28 18:35:22.483	2020-01-28 18:35:22.483	https://storage.googleapis.com/photos3drs/411/2.png	411
421	2020-01-28 18:35:22.485	2020-01-28 18:35:22.485	https://storage.googleapis.com/photos3drs/411/3.png	411
422	2020-01-28 18:35:22.487	2020-01-28 18:35:22.487	https://storage.googleapis.com/photos3drs/411/5.png	411
423	2020-01-28 18:35:22.488	2020-01-28 18:35:22.488	https://storage.googleapis.com/photos3drs/411/2.png	411
426	2020-01-28 18:35:22.858	2020-01-28 18:35:22.858	https://storage.googleapis.com/photos3drs/419/1.png	419
427	2020-01-28 18:35:22.878	2020-01-28 18:35:22.878	https://storage.googleapis.com/photos3drs/419/5.png	419
428	2020-01-28 18:35:22.879	2020-01-28 18:35:22.879	https://storage.googleapis.com/photos3drs/419/2.png	419
436	2020-01-28 18:35:24.543	2020-01-28 18:35:24.543	https://storage.googleapis.com/photos3drs/430/3.png	430
437	2020-01-28 18:35:24.55	2020-01-28 18:35:24.55	https://storage.googleapis.com/photos3drs/430/4.png	430
438	2020-01-28 18:35:24.554	2020-01-28 18:35:24.554	https://storage.googleapis.com/photos3drs/430/4.png	430
442	2020-01-28 18:35:25.714	2020-01-28 18:35:25.714	https://storage.googleapis.com/photos3drs/440/1.png	440
443	2020-01-28 18:35:25.716	2020-01-28 18:35:25.716	https://storage.googleapis.com/photos3drs/440/2.png	440
453	2020-01-28 18:35:28.74	2020-01-28 18:35:28.74	https://storage.googleapis.com/photos3drs/445/3.png	445
454	2020-01-28 18:35:28.743	2020-01-28 18:35:28.743	https://storage.googleapis.com/photos3drs/445/5.png	445
455	2020-01-28 18:35:28.745	2020-01-28 18:35:28.745	https://storage.googleapis.com/photos3drs/445/4.png	445
465	2020-01-28 18:35:30.608	2020-01-28 18:35:30.608	https://storage.googleapis.com/photos3drs/457/5.png	457
466	2020-01-28 18:35:30.617	2020-01-28 18:35:30.617	https://storage.googleapis.com/photos3drs/457/2.png	457
467	2020-01-28 18:35:30.62	2020-01-28 18:35:30.62	https://storage.googleapis.com/photos3drs/457/5.png	457
476	2020-01-28 18:35:33.162	2020-01-28 18:35:33.162	https://storage.googleapis.com/photos3drs/469/4.png	469
477	2020-01-28 18:35:33.177	2020-01-28 18:35:33.177	https://storage.googleapis.com/photos3drs/469/3.png	469
478	2020-01-28 18:35:33.185	2020-01-28 18:35:33.185	https://storage.googleapis.com/photos3drs/469/5.png	469
479	2020-01-28 18:35:33.192	2020-01-28 18:35:33.192	https://storage.googleapis.com/photos3drs/469/5.png	469
483	2020-01-28 18:35:34.812	2020-01-28 18:35:34.812	https://storage.googleapis.com/photos3drs/481/3.png	481
484	2020-01-28 18:35:34.814	2020-01-28 18:35:34.814	https://storage.googleapis.com/photos3drs/481/4.png	481
485	2020-01-28 18:35:34.816	2020-01-28 18:35:34.816	https://storage.googleapis.com/photos3drs/481/3.png	481
488	2020-01-28 18:35:36.299	2020-01-28 18:35:36.299	https://storage.googleapis.com/photos3drs/487/3.png	487
489	2020-01-28 18:35:36.301	2020-01-28 18:35:36.301	https://storage.googleapis.com/photos3drs/487/3.png	487
490	2020-01-28 18:35:36.304	2020-01-28 18:35:36.304	https://storage.googleapis.com/photos3drs/487/1.png	487
431	2020-01-28 18:35:24.348	2020-01-28 18:35:24.348	https://storage.googleapis.com/photos3drs/425/4.png	425
432	2020-01-28 18:35:24.356	2020-01-28 18:35:24.356	https://storage.googleapis.com/photos3drs/425/1.png	425
433	2020-01-28 18:35:24.36	2020-01-28 18:35:24.36	https://storage.googleapis.com/photos3drs/425/1.png	425
434	2020-01-28 18:35:24.364	2020-01-28 18:35:24.364	https://storage.googleapis.com/photos3drs/425/1.png	425
446	2020-01-28 18:35:27.409	2020-01-28 18:35:27.409	https://storage.googleapis.com/photos3drs/441/1.png	441
447	2020-01-28 18:35:27.411	2020-01-28 18:35:27.411	https://storage.googleapis.com/photos3drs/441/4.png	441
448	2020-01-28 18:35:27.412	2020-01-28 18:35:27.412	https://storage.googleapis.com/photos3drs/441/4.png	441
449	2020-01-28 18:35:27.414	2020-01-28 18:35:27.414	https://storage.googleapis.com/photos3drs/441/1.png	441
450	2020-01-28 18:35:27.415	2020-01-28 18:35:27.415	https://storage.googleapis.com/photos3drs/441/3.png	441
458	2020-01-28 18:35:30.345	2020-01-28 18:35:30.345	https://storage.googleapis.com/photos3drs/452/4.png	452
459	2020-01-28 18:35:30.347	2020-01-28 18:35:30.347	https://storage.googleapis.com/photos3drs/452/2.png	452
460	2020-01-28 18:35:30.349	2020-01-28 18:35:30.349	https://storage.googleapis.com/photos3drs/452/3.png	452
461	2020-01-28 18:35:30.35	2020-01-28 18:35:30.35	https://storage.googleapis.com/photos3drs/452/5.png	452
462	2020-01-28 18:35:30.354	2020-01-28 18:35:30.354	https://storage.googleapis.com/photos3drs/452/1.png	452
470	2020-01-28 18:35:33.063	2020-01-28 18:35:33.063	https://storage.googleapis.com/photos3drs/464/1.png	464
471	2020-01-28 18:35:33.069	2020-01-28 18:35:33.069	https://storage.googleapis.com/photos3drs/464/5.png	464
472	2020-01-28 18:35:33.072	2020-01-28 18:35:33.072	https://storage.googleapis.com/photos3drs/464/1.png	464
473	2020-01-28 18:35:33.075	2020-01-28 18:35:33.075	https://storage.googleapis.com/photos3drs/464/1.png	464
474	2020-01-28 18:35:33.078	2020-01-28 18:35:33.078	https://storage.googleapis.com/photos3drs/464/5.png	464
492	2020-01-28 18:35:36.522	2020-01-28 18:35:36.522	https://storage.googleapis.com/photos3drs/482/5.png	482
493	2020-01-28 18:35:36.527	2020-01-28 18:35:36.527	https://storage.googleapis.com/photos3drs/482/5.png	482
494	2020-01-28 18:35:36.53	2020-01-28 18:35:36.53	https://storage.googleapis.com/photos3drs/482/1.png	482
495	2020-01-28 18:35:36.533	2020-01-28 18:35:36.533	https://storage.googleapis.com/photos3drs/482/3.png	482
496	2020-01-28 18:35:36.538	2020-01-28 18:35:36.538	https://storage.googleapis.com/photos3drs/482/2.png	482
497	2020-01-28 18:35:36.54	2020-01-28 18:35:36.54	https://storage.googleapis.com/photos3drs/482/5.png	482
500	2020-01-28 18:35:38.558	2020-01-28 18:35:38.558	https://storage.googleapis.com/photos3drs/499/2.png	499
501	2020-01-28 18:35:38.56	2020-01-28 18:35:38.56	https://storage.googleapis.com/photos3drs/499/1.png	499
502	2020-01-28 18:35:38.57	2020-01-28 18:35:38.57	https://storage.googleapis.com/photos3drs/499/4.png	499
503	2020-01-28 18:35:38.572	2020-01-28 18:35:38.572	https://storage.googleapis.com/photos3drs/499/3.png	499
506	2020-01-28 18:35:40.881	2020-01-28 18:35:40.881	https://storage.googleapis.com/photos3drs/505/1.png	505
507	2020-01-28 18:35:40.884	2020-01-28 18:35:40.884	https://storage.googleapis.com/photos3drs/505/5.png	505
508	2020-01-28 18:35:40.886	2020-01-28 18:35:40.886	https://storage.googleapis.com/photos3drs/505/5.png	505
509	2020-01-28 18:35:40.889	2020-01-28 18:35:40.889	https://storage.googleapis.com/photos3drs/505/5.png	505
512	2020-01-28 18:35:42.402	2020-01-28 18:35:42.402	https://storage.googleapis.com/photos3drs/511/1.png	511
513	2020-01-28 18:35:42.405	2020-01-28 18:35:42.405	https://storage.googleapis.com/photos3drs/511/1.png	511
514	2020-01-28 18:35:42.407	2020-01-28 18:35:42.407	https://storage.googleapis.com/photos3drs/511/2.png	511
517	2020-01-28 18:35:43.313	2020-01-28 18:35:43.313	https://storage.googleapis.com/photos3drs/516/3.png	516
518	2020-01-28 18:35:43.315	2020-01-28 18:35:43.315	https://storage.googleapis.com/photos3drs/516/5.png	516
521	2020-01-28 18:35:46.253	2020-01-28 18:35:46.253	https://storage.googleapis.com/photos3drs/520/4.png	520
522	2020-01-28 18:35:46.256	2020-01-28 18:35:46.256	https://storage.googleapis.com/photos3drs/520/1.png	520
523	2020-01-28 18:35:46.259	2020-01-28 18:35:46.259	https://storage.googleapis.com/photos3drs/520/2.png	520
524	2020-01-28 18:35:46.262	2020-01-28 18:35:46.262	https://storage.googleapis.com/photos3drs/520/4.png	520
525	2020-01-28 18:35:46.265	2020-01-28 18:35:46.265	https://storage.googleapis.com/photos3drs/520/4.png	520
528	2020-01-28 18:35:47.951	2020-01-28 18:35:47.951	https://storage.googleapis.com/photos3drs/527/4.png	527
529	2020-01-28 18:35:47.953	2020-01-28 18:35:47.953	https://storage.googleapis.com/photos3drs/527/1.png	527
530	2020-01-28 18:35:47.956	2020-01-28 18:35:47.956	https://storage.googleapis.com/photos3drs/527/5.png	527
533	2020-01-28 18:35:49.602	2020-01-28 18:35:49.602	https://storage.googleapis.com/photos3drs/532/1.png	532
534	2020-01-28 18:35:49.606	2020-01-28 18:35:49.606	https://storage.googleapis.com/photos3drs/532/2.png	532
535	2020-01-28 18:35:49.613	2020-01-28 18:35:49.613	https://storage.googleapis.com/photos3drs/532/2.png	532
538	2020-01-28 18:35:52.147	2020-01-28 18:35:52.147	https://storage.googleapis.com/photos3drs/537/5.png	537
539	2020-01-28 18:35:52.149	2020-01-28 18:35:52.149	https://storage.googleapis.com/photos3drs/537/5.png	537
540	2020-01-28 18:35:52.15	2020-01-28 18:35:52.15	https://storage.googleapis.com/photos3drs/537/3.png	537
541	2020-01-28 18:35:52.152	2020-01-28 18:35:52.152	https://storage.googleapis.com/photos3drs/537/4.png	537
542	2020-01-28 18:35:52.153	2020-01-28 18:35:52.153	https://storage.googleapis.com/photos3drs/537/3.png	537
545	2020-01-28 18:35:54.304	2020-01-28 18:35:54.304	https://storage.googleapis.com/photos3drs/544/3.png	544
546	2020-01-28 18:35:54.308	2020-01-28 18:35:54.308	https://storage.googleapis.com/photos3drs/544/2.png	544
547	2020-01-28 18:35:54.31	2020-01-28 18:35:54.31	https://storage.googleapis.com/photos3drs/544/4.png	544
548	2020-01-28 18:35:54.311	2020-01-28 18:35:54.311	https://storage.googleapis.com/photos3drs/544/2.png	544
551	2020-01-28 18:35:57.112	2020-01-28 18:35:57.112	https://storage.googleapis.com/photos3drs/550/2.png	550
552	2020-01-28 18:35:57.114	2020-01-28 18:35:57.114	https://storage.googleapis.com/photos3drs/550/3.png	550
553	2020-01-28 18:35:57.115	2020-01-28 18:35:57.115	https://storage.googleapis.com/photos3drs/550/5.png	550
554	2020-01-28 18:35:57.116	2020-01-28 18:35:57.116	https://storage.googleapis.com/photos3drs/550/3.png	550
555	2020-01-28 18:35:57.118	2020-01-28 18:35:57.118	https://storage.googleapis.com/photos3drs/550/1.png	550
556	2020-01-28 18:35:57.124	2020-01-28 18:35:57.124	https://storage.googleapis.com/photos3drs/550/5.png	550
559	2020-01-28 18:35:59.634	2020-01-28 18:35:59.634	https://storage.googleapis.com/photos3drs/558/5.png	558
560	2020-01-28 18:35:59.636	2020-01-28 18:35:59.636	https://storage.googleapis.com/photos3drs/558/5.png	558
561	2020-01-28 18:35:59.638	2020-01-28 18:35:59.638	https://storage.googleapis.com/photos3drs/558/4.png	558
562	2020-01-28 18:35:59.639	2020-01-28 18:35:59.639	https://storage.googleapis.com/photos3drs/558/5.png	558
563	2020-01-28 18:35:59.64	2020-01-28 18:35:59.64	https://storage.googleapis.com/photos3drs/558/2.png	558
\.


--
-- Data for Name: _token; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._token (id, revoked) FROM stdin;
\.


--
-- Data for Name: _user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._user (id, created_at, updated_at, about_me, age, avatar, birth_date, email, email_verification_required, first_name, full_name, gender, last_name, password, phone_number, phone_verification_required, user_status, verification_code) FROM stdin;
1000	2020-01-28 18:33:37.796	2020-01-28 18:33:37.796	\N	\N	https://s3.amazonaws.com/uifaces/faces/twitter/jmillspaysbills/128.jpg	\N	owner0@gmail.com	f	Raymon	\N	\N	Boyle	$2a$10$Bzlc2Ys7Tt.gMtX4r5hUWe3wg6hZLB.2/PkuCRPUHHfumUiPmZyPm	848-741-6210	f	\N	\N
1002	2020-01-28 18:33:51.174	2020-01-28 18:33:51.174	\N	\N	https://s3.amazonaws.com/uifaces/faces/twitter/tom_even/128.jpg	\N	owner1@gmail.com	f	Malcom	\N	\N	Cole	$2a$10$dbRzECEOfNYd4GOmiUKD0uDpQnGsZWsiI6ac1cgiiT4RvDUTTrcki	(332) 554-2597	f	\N	\N
1004	2020-01-28 18:34:00.488	2020-01-28 18:34:00.488	\N	\N	https://s3.amazonaws.com/uifaces/faces/twitter/_yardenoon/128.jpg	\N	owner2@gmail.com	f	Brittni	\N	\N	Jacobson	$2a$10$xJP43ms0P6I/m.NT06B2WOA2qHzt6kHz9doysPxWLgmaXxU4TM54i	(524) 351-6484	f	\N	\N
1005	2020-01-28 18:34:05.628	2020-01-28 18:34:05.628	\N	\N	https://s3.amazonaws.com/uifaces/faces/twitter/mizhgan/128.jpg	\N	owner3@gmail.com	f	Cherlyn	\N	\N	Haley	$2a$10$4b8BI92WiCJtb4LCJzE0dOqgUevlJ.XM00nXhpV1hM1wh6caH4UDe	1-762-837-3120	f	\N	\N
1007	2020-01-28 18:34:14.418	2020-01-28 18:34:14.418	\N	\N	https://s3.amazonaws.com/uifaces/faces/twitter/ostirbu/128.jpg	\N	owner4@gmail.com	f	Tyisha	\N	\N	Ullrich	$2a$10$OR1pVv7ycQbhf1HhhpBW8O99QoRFRGc2XhVYidINv2SD7gwuhU102	776.263.0776	f	\N	\N
1009	2020-01-28 18:34:21.478	2020-01-28 18:34:21.478	\N	\N	https://s3.amazonaws.com/uifaces/faces/twitter/uxward/128.jpg	\N	owner5@gmail.com	f	Suzann	\N	\N	Reilly	$2a$10$JzToqEImQYIIsSwX0liiweVe5n6/mzzLXAt/VdslGAQaga3SmPetW	957-403-5036	f	\N	\N
1012	2020-01-28 18:34:30.882	2020-01-28 18:34:30.882	\N	\N	https://s3.amazonaws.com/uifaces/faces/twitter/abdots/128.jpg	\N	owner6@gmail.com	f	Ronny	\N	\N	Klein	$2a$10$5TaLnb8BBA7CM2TIooSe9O6vGxpDUzeOv9bmLlBdsDqXi7YAs2yz.	(086) 546-9728	f	\N	\N
1014	2020-01-28 18:34:35.927	2020-01-28 18:34:35.927	\N	\N	https://s3.amazonaws.com/uifaces/faces/twitter/vitor376/128.jpg	\N	owner7@gmail.com	f	Hildegarde	\N	\N	Terry	$2a$10$cLV.2aDXynapPiJPCkdFYer1OHT8HMnwXnJpxul89PVXoKLV7rRbG	(217) 673-0071	f	\N	\N
1015	2020-01-28 18:34:41.068	2020-01-28 18:34:41.068	\N	\N	https://s3.amazonaws.com/uifaces/faces/twitter/mslarkina/128.jpg	\N	owner8@gmail.com	f	Richie	\N	\N	Lang	$2a$10$rszHW45xf.uSt3dwjUeUhOzMmYenuJ7bUWim6yyJTM3WpuptF2BoS	(670) 227-3619	f	\N	\N
1017	2020-01-28 18:34:43.637	2020-01-28 18:34:43.637	\N	\N	https://s3.amazonaws.com/uifaces/faces/twitter/SlaapMe/128.jpg	\N	owner9@gmail.com	f	Boyce	\N	\N	Denesik	$2a$10$fPv5krT1z2MSj81hedb9Hu.TuEe68hLDslqJwSBjV.sfj/Dd.mame	351.078.8738	f	\N	\N
1018	2020-01-28 18:34:45.36	2020-01-28 18:34:45.36	\N	\N	https://s3.amazonaws.com/uifaces/faces/twitter/jay_wilburn/128.jpg	\N	owner10@gmail.com	f	Blake	\N	\N	Nitzsche	$2a$10$G8SOJVIUD1Egzowu/ROGf.FyIK7vljy3r43K.lJ2UpviysrkzvA1u	947.512.0338	f	\N	\N
1020	2020-01-28 18:34:51.151	2020-01-28 18:34:51.151	\N	\N	https://s3.amazonaws.com/uifaces/faces/twitter/motionthinks/128.jpg	\N	owner11@gmail.com	f	Carol	\N	\N	Mosciski	$2a$10$pDtdUVwp5DzxUTXKJr6HiuJqxKWbLf5SpS4Gi5zjdmccHqM/tkSLy	696.073.7085	f	\N	\N
1022	2020-01-28 18:35:00.178	2020-01-28 18:35:00.178	\N	\N	https://s3.amazonaws.com/uifaces/faces/twitter/tweetubhai/128.jpg	\N	owner12@gmail.com	f	Charlette	\N	\N	Cronin	$2a$10$MoEH/fC1Y22rLlKjaFarbOctb6gW3m.Gp.Skk8P.V/70KK5Lz/n1u	(873) 343-4317	f	\N	\N
1023	2020-01-28 18:35:01.975	2020-01-28 18:35:01.975	\N	\N	https://s3.amazonaws.com/uifaces/faces/twitter/gcmorley/128.jpg	\N	owner13@gmail.com	f	Donn	\N	\N	Erdman	$2a$10$QNktx8V1mHmDF4q9v2jVyuU06DsdkUeeQwHUZbBhPZsNntK4cYDs6	140-817-3698	f	\N	\N
1024	2020-01-28 18:35:06.183	2020-01-28 18:35:06.183	\N	\N	https://s3.amazonaws.com/uifaces/faces/twitter/mbilderbach/128.jpg	\N	owner14@gmail.com	f	Karon	\N	\N	Kiehn	$2a$10$UI.iJNsFYdSVa1HXLRol/eyMnwDniCy9dwFyoDQdadfueRvegIA0S	065-099-0327	f	\N	\N
1027	2020-01-28 18:35:12.692	2020-01-28 18:35:12.692	\N	\N	https://s3.amazonaws.com/uifaces/faces/twitter/weglov/128.jpg	\N	owner15@gmail.com	f	Ofelia	\N	\N	Rice	$2a$10$V8wu0voacy/ycKIwP7hzKOgrXgS96d1HPN7DTdDSS3A/xZocY/Ti6	488.307.5892	f	\N	\N
1029	2020-01-28 18:35:15.373	2020-01-28 18:35:15.373	\N	\N	https://s3.amazonaws.com/uifaces/faces/twitter/stan/128.jpg	\N	owner16@gmail.com	f	Tony	\N	\N	Goldner	$2a$10$N5mWYjTrmxAFKw7Oc5f/ReInskbHGCRr4sn9vtLIr2W5uWZIQqeri	1-719-871-8418	f	\N	\N
1032	2020-01-28 18:35:18.036	2020-01-28 18:35:18.036	\N	\N	https://s3.amazonaws.com/uifaces/faces/twitter/helderleal/128.jpg	\N	owner17@gmail.com	f	Vicki	\N	\N	Murazik	$2a$10$vrKmQObUgnsxQdWm/4a4d.UD9fuxLXL.wHbRFBMAVJ1KMJRxa.ssO	(993) 864-2364	f	\N	\N
1033	2020-01-28 18:35:23.09	2020-01-28 18:35:23.09	\N	\N	https://s3.amazonaws.com/uifaces/faces/twitter/holdenweb/128.jpg	\N	owner18@gmail.com	f	Jerold	\N	\N	Boehm	$2a$10$5FfEjfPft9.BEpxM0.HI2OhTfEz/clrMYGv1ln/ZRkdLxCVefxFR2	1-789-132-2470	f	\N	\N
1035	2020-01-28 18:35:25.96	2020-01-28 18:35:25.96	\N	\N	https://s3.amazonaws.com/uifaces/faces/twitter/jervo/128.jpg	\N	owner19@gmail.com	f	Kenny	\N	\N	Kassulke	$2a$10$IBnc4QE4q7eS1dMyNCe4eu/GbtdRrwREzEcewZlcefpy6WE0K8i0e	632-524-8670	f	\N	\N
1036	2020-01-28 18:35:30.815	2020-01-28 18:35:30.815	\N	\N	https://s3.amazonaws.com/uifaces/faces/twitter/cdharrison/128.jpg	\N	owner20@gmail.com	f	Herschel	\N	\N	Skiles	$2a$10$VhHo3Qvn2ZVSVSUxS0VdDeMHx0PcBGM05hxfZgW3W/rPOOKV6RSAy	1-735-432-7696	f	\N	\N
1042	2020-01-28 18:39:37.254	2020-01-28 18:39:37.254	\N	\N	\N	\N	thejohnpage@gmail.com	f	\N	John Page	\N	\N	$2a$10$QHu4tysSJpU2J0h5Ec5xx.MqwDtRz8zxOTDZTUAC5Fsjo7lamCv9K	\N	f	\N	123456
1043	2020-01-28 18:49:04.17	2020-01-28 18:49:04.17	\N	\N	\N	\N	fred@acme.com	f	\N	Fred	\N	\N	$2a$10$sINOisiTSFewgg3cTQJa6Ok1cPItbkHDD9PoXi.IZ85EaIQlTtrGm	\N	f	\N	123456
1044	2020-02-03 06:43:55.125	2020-02-03 06:43:55.125	\N	\N	\N	\N	test@gmail.com	f	\N	luis gaytan	\N	\N	$2a$10$FtlPZF/FPMS6ariR7R085.azTAbjPT48QLzPGnfx3SIfTQs0MDOKq	\N	f	\N	123456
1045	2020-02-06 13:38:54.372	2020-02-06 13:38:54.372	\N	\N	\N	\N	test@test.com	f	\N	test	\N	\N	$2a$10$hmnI6Zd9XRLBL8LeWFwRDe2oo7kYlRqky2XvyMGqixKZRNXRrCKWS	\N	f	\N	123456
\.


--
-- Data for Name: _user_property_fav; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._user_property_fav (user_id, property_id) FROM stdin;
\.


--
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.company (id, name, age, address, salary) FROM stdin;
\.


--
-- Data for Name: hibernate_sequences; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.hibernate_sequences (sequence_name, next_val) FROM stdin;
default	1
\.


--
-- Data for Name: read_marker; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.read_marker (id, created_at, updated_at, channel_id, member_id, t) FROM stdin;
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.role (id, name) FROM stdin;
1	ROLE_USER
2	ROLE_ADMIN
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Data for Name: spring_session; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.spring_session (primary_id, session_id, creation_time, last_access_time, max_inactive_interval, expiry_time, principal_name) FROM stdin;
\.


--
-- Data for Name: spring_session_attributes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.spring_session_attributes (session_primary_id, attribute_name, attribute_bytes) FROM stdin;
\.


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_roles (user_id, role_id) FROM stdin;
1000	1
1002	1
1004	1
1005	1
1007	1
1009	1
1012	1
1014	1
1015	1
1017	1
1018	1
1020	1
1022	1
1023	1
1024	1
1027	1
1029	1
1032	1
1033	1
1035	1
1036	1
1042	1
1043	1
1044	1
1045	1
\.


--
-- Data for Name: geocode_settings; Type: TABLE DATA; Schema: tiger; Owner: -
--

COPY tiger.geocode_settings (name, setting, unit, category, short_desc) FROM stdin;
\.


--
-- Data for Name: pagc_gaz; Type: TABLE DATA; Schema: tiger; Owner: -
--

COPY tiger.pagc_gaz (id, seq, word, stdword, token, is_custom) FROM stdin;
\.


--
-- Data for Name: pagc_lex; Type: TABLE DATA; Schema: tiger; Owner: -
--

COPY tiger.pagc_lex (id, seq, word, stdword, token, is_custom) FROM stdin;
\.


--
-- Data for Name: pagc_rules; Type: TABLE DATA; Schema: tiger; Owner: -
--

COPY tiger.pagc_rules (id, rule, is_custom) FROM stdin;
\.


--
-- Data for Name: topology; Type: TABLE DATA; Schema: topology; Owner: -
--

COPY topology.topology (id, name, srid, "precision", hasz) FROM stdin;
\.


--
-- Data for Name: layer; Type: TABLE DATA; Schema: topology; Owner: -
--

COPY topology.layer (topology_id, layer_id, schema_name, table_name, feature_column, feature_type, level, child_id) FROM stdin;
\.


--
-- Name: hibernate_sequence; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.hibernate_sequence', 566, true);


--
-- Name: my_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.my_seq', 1045, true);


--
-- Name: read_marker_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.read_marker_id_seq', 1, false);


--
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.role_id_seq', 4, true);


--
-- Name: _channel _channel_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._channel
    ADD CONSTRAINT _channel_pkey PRIMARY KEY (id);


--
-- Name: _channel_users _channel_users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._channel_users
    ADD CONSTRAINT _channel_users_pkey PRIMARY KEY (channel_id, user_id);


--
-- Name: _like _like_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._like
    ADD CONSTRAINT _like_pkey PRIMARY KEY (liked_username, sender_username);


--
-- Name: _listing _listing_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._listing
    ADD CONSTRAINT _listing_pkey PRIMARY KEY (id);


--
-- Name: _message _message_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._message
    ADD CONSTRAINT _message_pkey PRIMARY KEY (id);


--
-- Name: _photo _photo_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._photo
    ADD CONSTRAINT _photo_pkey PRIMARY KEY (id);


--
-- Name: _photos _photos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._photos
    ADD CONSTRAINT _photos_pkey PRIMARY KEY (id);


--
-- Name: _property_photos _property_photos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._property_photos
    ADD CONSTRAINT _property_photos_pkey PRIMARY KEY (id);


--
-- Name: _property _property_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._property
    ADD CONSTRAINT _property_pkey PRIMARY KEY (id);


--
-- Name: _token _token_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._token
    ADD CONSTRAINT _token_pkey PRIMARY KEY (id);


--
-- Name: _user _user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._user
    ADD CONSTRAINT _user_pkey PRIMARY KEY (id);


--
-- Name: _user_property_fav _user_property_fav_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._user_property_fav
    ADD CONSTRAINT _user_property_fav_pkey PRIMARY KEY (user_id, property_id);


--
-- Name: company company_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (id);


--
-- Name: hibernate_sequences hibernate_sequences_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hibernate_sequences
    ADD CONSTRAINT hibernate_sequences_pkey PRIMARY KEY (sequence_name);


--
-- Name: read_marker read_marker_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.read_marker
    ADD CONSTRAINT read_marker_pkey PRIMARY KEY (id);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- Name: spring_session_attributes spring_session_attributes_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.spring_session_attributes
    ADD CONSTRAINT spring_session_attributes_pk PRIMARY KEY (session_primary_id, attribute_name);


--
-- Name: spring_session spring_session_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.spring_session
    ADD CONSTRAINT spring_session_pk PRIMARY KEY (primary_id);


--
-- Name: _user uk1b1tkkmtamnpuqpgqtlyig1br; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._user
    ADD CONSTRAINT uk1b1tkkmtamnpuqpgqtlyig1br UNIQUE (phone_number);


--
-- Name: role uk_epk9im9l9q67xmwi4hbed25do; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT uk_epk9im9l9q67xmwi4hbed25do UNIQUE (name);


--
-- Name: _user uk_ruq9ye5n9xmd4y23fc67m539t; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._user
    ADD CONSTRAINT uk_ruq9ye5n9xmd4y23fc67m539t UNIQUE (email, phone_number);


--
-- Name: _user ukk11y3pdtsrjgy8w9b6q4bjwrx; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._user
    ADD CONSTRAINT ukk11y3pdtsrjgy8w9b6q4bjwrx UNIQUE (email);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id);


--
-- Name: _message_index_0; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _message_index_0 ON public._message USING btree (_channel_id);


--
-- Name: _photo_index_0; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _photo_index_0 ON public._photos USING btree (user_id);


--
-- Name: spring_session_ix1; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX spring_session_ix1 ON public.spring_session USING btree (session_id);


--
-- Name: spring_session_ix2; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX spring_session_ix2 ON public.spring_session USING btree (expiry_time);


--
-- Name: spring_session_ix3; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX spring_session_ix3 ON public.spring_session USING btree (principal_name);


--
-- Name: _user_property_fav fk1x9q64mpaef5dqejkq9ph1i16; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._user_property_fav
    ADD CONSTRAINT fk1x9q64mpaef5dqejkq9ph1i16 FOREIGN KEY (user_id) REFERENCES public._user(id);


--
-- Name: _listing fk2rjltqqrgwepyoww4ioxhd8ts; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._listing
    ADD CONSTRAINT fk2rjltqqrgwepyoww4ioxhd8ts FOREIGN KEY (propery_id) REFERENCES public._property(id);


--
-- Name: _property_photos fkbmbj7xac0hwfryc5ch19w9wq6; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._property_photos
    ADD CONSTRAINT fkbmbj7xac0hwfryc5ch19w9wq6 FOREIGN KEY (property_id) REFERENCES public._property(id);


--
-- Name: user_roles fkcbsnrgq3e9qe6kuxq7wx6vlfm; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT fkcbsnrgq3e9qe6kuxq7wx6vlfm FOREIGN KEY (user_id) REFERENCES public._user(id);


--
-- Name: _photo fkepqq0fp1n0rai2ioohnpb8qu6; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._photo
    ADD CONSTRAINT fkepqq0fp1n0rai2ioohnpb8qu6 FOREIGN KEY (property_id) REFERENCES public._property(id);


--
-- Name: _user_property_fav fkfdrej7sv45rnfx6os6p3yyanx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._user_property_fav
    ADD CONSTRAINT fkfdrej7sv45rnfx6os6p3yyanx FOREIGN KEY (property_id) REFERENCES public._property(id);


--
-- Name: _message fkgm74sj06piyjqp2s4m7gatt67; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._message
    ADD CONSTRAINT fkgm74sj06piyjqp2s4m7gatt67 FOREIGN KEY (_sender_username) REFERENCES public._user(id);


--
-- Name: _property fkj5yks8vfk0lmb70igihfvh6sm; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._property
    ADD CONSTRAINT fkj5yks8vfk0lmb70igihfvh6sm FOREIGN KEY (_owner_id) REFERENCES public._user(id);


--
-- Name: _message fkmlupwb5pj3wb347q6re903efx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._message
    ADD CONSTRAINT fkmlupwb5pj3wb347q6re903efx FOREIGN KEY (_channel_id) REFERENCES public._channel(id);


--
-- Name: _channel_user fkq1o4cmy8ok21n7hhl3bhyekjv; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._channel_user
    ADD CONSTRAINT fkq1o4cmy8ok21n7hhl3bhyekjv FOREIGN KEY (user_id) REFERENCES public._user(id);


--
-- Name: _photo fkqj2uf6dqnpc2gffpg1517ib4j; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._photo
    ADD CONSTRAINT fkqj2uf6dqnpc2gffpg1517ib4j FOREIGN KEY (_user_id) REFERENCES public._user(id);


--
-- Name: user_roles fkrhfovtciq1l558cw6udg0h0d3; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT fkrhfovtciq1l558cw6udg0h0d3 FOREIGN KEY (role_id) REFERENCES public.role(id);


--
-- Name: _channel_user fksf8mx33ryc1fot8ytg7w39fo0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._channel_user
    ADD CONSTRAINT fksf8mx33ryc1fot8ytg7w39fo0 FOREIGN KEY (channel_id) REFERENCES public._channel(id);


--
-- Name: spring_session_attributes spring_session_attributes_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.spring_session_attributes
    ADD CONSTRAINT spring_session_attributes_fk FOREIGN KEY (session_primary_id) REFERENCES public.spring_session(primary_id) ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM cloudsqladmin;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO cloudsqlsuperuser;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- Name: TABLE spring_session; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.spring_session TO schenker;


--
-- Name: TABLE spring_session_attributes; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.spring_session_attributes TO schenker;


--
-- PostgreSQL database dump complete
--

