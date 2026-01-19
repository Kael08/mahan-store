--
-- PostgreSQL database dump
--

\restrict GkPlBVYH78IknuBCirRUMYHDbPcUtJc6h5zf7V3wImYxk6OgdEzM0dtyg3vIkTX

-- Dumped from database version 16.10
-- Dumped by pg_dump version 16.10

-- Started on 2026-01-19 20:58:55

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

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 58147)
-- Name: brands; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.brands (
    name character varying(100) NOT NULL,
    logo_url character varying(512) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.brands OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 58284)
-- Name: brands_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.brands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.brands_id_seq OWNER TO postgres;

--
-- TOC entry 4889 (class 0 OID 0)
-- Dependencies: 224
-- Name: brands_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.brands_id_seq OWNED BY public.brands.id;


--
-- TOC entry 216 (class 1259 OID 58133)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    name character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    "parentId" integer,
    id integer NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 58275)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO postgres;

--
-- TOC entry 4890 (class 0 OID 0)
-- Dependencies: 223
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 220 (class 1259 OID 58201)
-- Name: product_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_images (
    image_url character varying(512) NOT NULL,
    is_main boolean DEFAULT false NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    "productId" integer,
    id integer NOT NULL
);


ALTER TABLE public.product_images OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 58307)
-- Name: product_images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_images_id_seq OWNER TO postgres;

--
-- TOC entry 4891 (class 0 OID 0)
-- Dependencies: 226
-- Name: product_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_images_id_seq OWNED BY public.product_images.id;


--
-- TOC entry 221 (class 1259 OID 58218)
-- Name: product_links; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_links (
    url character varying(512) NOT NULL,
    platform character varying(100),
    label character varying(100),
    sort_order integer DEFAULT 0 NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    "productId" integer,
    id integer NOT NULL
);


ALTER TABLE public.product_links OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 58317)
-- Name: product_links_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_links_id_seq OWNER TO postgres;

--
-- TOC entry 4892 (class 0 OID 0)
-- Dependencies: 227
-- Name: product_links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_links_id_seq OWNED BY public.product_links.id;


--
-- TOC entry 219 (class 1259 OID 58186)
-- Name: product_variants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_variants (
    color character varying(50) NOT NULL,
    size character varying(50) NOT NULL,
    price numeric(10,2),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    "productId" integer,
    id integer NOT NULL,
    stock_status character varying DEFAULT 'in_stock'::character varying NOT NULL
);


ALTER TABLE public.product_variants OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 58295)
-- Name: product_variants_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_variants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_variants_id_seq OWNER TO postgres;

--
-- TOC entry 4893 (class 0 OID 0)
-- Dependencies: 225
-- Name: product_variants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_variants_id_seq OWNED BY public.product_variants.id;


--
-- TOC entry 218 (class 1259 OID 58158)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    title character varying(255) NOT NULL,
    description text NOT NULL,
    price_min numeric(10,2),
    price_max numeric(10,2),
    is_active boolean DEFAULT true NOT NULL,
    priority_boost integer DEFAULT 0 NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    "sellerId" integer,
    "categoryId" integer,
    "brandId" integer,
    id integer NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 58327)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- TOC entry 4894 (class 0 OID 0)
-- Dependencies: 228
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 229 (class 1259 OID 74647)
-- Name: refresh_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.refresh_tokens (
    token character varying(512) NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    "sellerId" integer,
    id integer NOT NULL,
    seller_id integer NOT NULL
);


ALTER TABLE public.refresh_tokens OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 74663)
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.refresh_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.refresh_tokens_id_seq OWNER TO postgres;

--
-- TOC entry 4895 (class 0 OID 0)
-- Dependencies: 230
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.refresh_tokens_id_seq OWNED BY public.refresh_tokens.id;


--
-- TOC entry 215 (class 1259 OID 58110)
-- Name: sellers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sellers (
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    avatar_url character varying(512),
    description text,
    is_active boolean DEFAULT true NOT NULL,
    max_products integer DEFAULT 0 NOT NULL,
    priority integer DEFAULT 0 NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.sellers OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 58262)
-- Name: sellers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sellers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sellers_id_seq OWNER TO postgres;

--
-- TOC entry 4896 (class 0 OID 0)
-- Dependencies: 222
-- Name: sellers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sellers_id_seq OWNED BY public.sellers.id;


--
-- TOC entry 4680 (class 2604 OID 58285)
-- Name: brands id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands ALTER COLUMN id SET DEFAULT nextval('public.brands_id_seq'::regclass);


--
-- TOC entry 4677 (class 2604 OID 58276)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 4693 (class 2604 OID 58308)
-- Name: product_images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_images ALTER COLUMN id SET DEFAULT nextval('public.product_images_id_seq'::regclass);


--
-- TOC entry 4696 (class 2604 OID 58318)
-- Name: product_links id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_links ALTER COLUMN id SET DEFAULT nextval('public.product_links_id_seq'::regclass);


--
-- TOC entry 4688 (class 2604 OID 58296)
-- Name: product_variants id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_variants ALTER COLUMN id SET DEFAULT nextval('public.product_variants_id_seq'::regclass);


--
-- TOC entry 4685 (class 2604 OID 58328)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 4698 (class 2604 OID 74664)
-- Name: refresh_tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('public.refresh_tokens_id_seq'::regclass);


--
-- TOC entry 4674 (class 2604 OID 58263)
-- Name: sellers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sellers ALTER COLUMN id SET DEFAULT nextval('public.sellers_id_seq'::regclass);


--
-- TOC entry 4870 (class 0 OID 58147)
-- Dependencies: 217
-- Data for Name: brands; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.brands (name, logo_url, created_at, updated_at, id) FROM stdin;
\.


--
-- TOC entry 4869 (class 0 OID 58133)
-- Dependencies: 216
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (name, created_at, updated_at, "parentId", id) FROM stdin;
\.


--
-- TOC entry 4873 (class 0 OID 58201)
-- Dependencies: 220
-- Data for Name: product_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_images (image_url, is_main, sort_order, created_at, "productId", id) FROM stdin;
\.


--
-- TOC entry 4874 (class 0 OID 58218)
-- Dependencies: 221
-- Data for Name: product_links; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_links (url, platform, label, sort_order, created_at, "productId", id) FROM stdin;
\.


--
-- TOC entry 4872 (class 0 OID 58186)
-- Dependencies: 219
-- Data for Name: product_variants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_variants (color, size, price, created_at, updated_at, "productId", id, stock_status) FROM stdin;
\.


--
-- TOC entry 4871 (class 0 OID 58158)
-- Dependencies: 218
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (title, description, price_min, price_max, is_active, priority_boost, created_at, updated_at, "sellerId", "categoryId", "brandId", id) FROM stdin;
\.


--
-- TOC entry 4882 (class 0 OID 74647)
-- Dependencies: 229
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.refresh_tokens (token, expires_at, created_at, "sellerId", id, seller_id) FROM stdin;
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoidGVzdEBzZWxsZXIuY29tIiwiaWF0IjoxNzY4ODQ1NDI0LCJleHAiOjE3Njk0NTAyMjR9.kObOrT6m7F67Q_EKqc_N17i1CWeq7flurTWPA1_yjBI	2026-01-26 20:57:04.949	2026-01-19 20:57:04.953201	\N	1	2
\.


--
-- TOC entry 4868 (class 0 OID 58110)
-- Dependencies: 215
-- Data for Name: sellers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sellers (name, email, password_hash, avatar_url, description, is_active, max_products, priority, created_at, updated_at, id) FROM stdin;
Mingiyan8	min@mail.ru	$2b$10$j7L1tkcctY/fPNxK0sOBIuy4Qt/HrPpn59zbCH4VWax531wJMXK1K	http://localhost:9000/images/sellers/1768742849223-avatar	я мингиян я мингиян)3232	f	0	0	2026-01-18 15:16:58.986894	2026-01-18 16:27:29.325929	3
Mingiyan8	test@seller.com	$2b$10$/B4g4UWJmMOFk4xqyYqQMOwHP9d.K96qIQHvgbnVX1MuJZo237wDm	http://localhost:9000/images/sellers/1768394275501-avatar	я мингиян я мингиян)3232	t	0	0	2026-01-14 15:37:55.67855	2026-01-19 20:57:02.292835	2
\.


--
-- TOC entry 4897 (class 0 OID 0)
-- Dependencies: 224
-- Name: brands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.brands_id_seq', 1, false);


--
-- TOC entry 4898 (class 0 OID 0)
-- Dependencies: 223
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 1, false);


--
-- TOC entry 4899 (class 0 OID 0)
-- Dependencies: 226
-- Name: product_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_images_id_seq', 1, false);


--
-- TOC entry 4900 (class 0 OID 0)
-- Dependencies: 227
-- Name: product_links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_links_id_seq', 1, false);


--
-- TOC entry 4901 (class 0 OID 0)
-- Dependencies: 225
-- Name: product_variants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_variants_id_seq', 1, false);


--
-- TOC entry 4902 (class 0 OID 0)
-- Dependencies: 228
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 1, false);


--
-- TOC entry 4903 (class 0 OID 0)
-- Dependencies: 230
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.refresh_tokens_id_seq', 1, true);


--
-- TOC entry 4904 (class 0 OID 0)
-- Dependencies: 222
-- Name: sellers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sellers_id_seq', 3, true);


--
-- TOC entry 4708 (class 2606 OID 58335)
-- Name: products PK_0806c755e0aca124e67c0cf6d7d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY (id);


--
-- TOC entry 4712 (class 2606 OID 58315)
-- Name: product_images PK_1974264ea7265989af8392f63a1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT "PK_1974264ea7265989af8392f63a1" PRIMARY KEY (id);


--
-- TOC entry 4704 (class 2606 OID 58281)
-- Name: categories PK_24dbc6126a28ff948da33e97d3b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY (id);


--
-- TOC entry 4710 (class 2606 OID 58301)
-- Name: product_variants PK_281e3f2c55652d6a22c0aa59fd7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_variants
    ADD CONSTRAINT "PK_281e3f2c55652d6a22c0aa59fd7" PRIMARY KEY (id);


--
-- TOC entry 4716 (class 2606 OID 74672)
-- Name: refresh_tokens PK_7d8bee0204106019488c4c50ffa; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY (id);


--
-- TOC entry 4700 (class 2606 OID 58270)
-- Name: sellers PK_97337ccbf692c58e6c7682de8a2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sellers
    ADD CONSTRAINT "PK_97337ccbf692c58e6c7682de8a2" PRIMARY KEY (id);


--
-- TOC entry 4706 (class 2606 OID 58292)
-- Name: brands PK_b0c437120b624da1034a81fc561; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY (id);


--
-- TOC entry 4714 (class 2606 OID 58325)
-- Name: product_links PK_cd044119ad0ebe7ff0ccbb47939; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_links
    ADD CONSTRAINT "PK_cd044119ad0ebe7ff0ccbb47939" PRIMARY KEY (id);


--
-- TOC entry 4702 (class 2606 OID 58272)
-- Name: sellers UQ_60a049dd3231ed458dccfdaf406; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sellers
    ADD CONSTRAINT "UQ_60a049dd3231ed458dccfdaf406" UNIQUE (email);


--
-- TOC entry 4724 (class 2606 OID 74674)
-- Name: refresh_tokens FK_4513f649ba8412628db1f0e0647; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT "FK_4513f649ba8412628db1f0e0647" FOREIGN KEY ("sellerId") REFERENCES public.sellers(id);


--
-- TOC entry 4717 (class 2606 OID 58338)
-- Name: categories FK_9a6f051e66982b5f0318981bcaa; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT "FK_9a6f051e66982b5f0318981bcaa" FOREIGN KEY ("parentId") REFERENCES public.categories(id);


--
-- TOC entry 4722 (class 2606 OID 58348)
-- Name: product_images FK_b367708bf720c8dd62fc6833161; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT "FK_b367708bf720c8dd62fc6833161" FOREIGN KEY ("productId") REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 4718 (class 2606 OID 58358)
-- Name: products FK_e40a1dd2909378f0da1f34f7bd6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "FK_e40a1dd2909378f0da1f34f7bd6" FOREIGN KEY ("sellerId") REFERENCES public.sellers(id) ON DELETE CASCADE;


--
-- TOC entry 4719 (class 2606 OID 58368)
-- Name: products FK_ea86d0c514c4ecbb5694cbf57df; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "FK_ea86d0c514c4ecbb5694cbf57df" FOREIGN KEY ("brandId") REFERENCES public.brands(id);


--
-- TOC entry 4723 (class 2606 OID 58353)
-- Name: product_links FK_f2f04696313da8222f16065878f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_links
    ADD CONSTRAINT "FK_f2f04696313da8222f16065878f" FOREIGN KEY ("productId") REFERENCES public.products(id);


--
-- TOC entry 4721 (class 2606 OID 58343)
-- Name: product_variants FK_f515690c571a03400a9876600b5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_variants
    ADD CONSTRAINT "FK_f515690c571a03400a9876600b5" FOREIGN KEY ("productId") REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 4720 (class 2606 OID 58363)
-- Name: products FK_ff56834e735fa78a15d0cf21926; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES public.categories(id);


-- Completed on 2026-01-19 20:58:55

--
-- PostgreSQL database dump complete
--

\unrestrict GkPlBVYH78IknuBCirRUMYHDbPcUtJc6h5zf7V3wImYxk6OgdEzM0dtyg3vIkTX

