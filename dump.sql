--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)

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
-- Name: recommendations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recommendations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    youtube_link text NOT NULL,
    score integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.recommendations OWNER TO postgres;

--
-- Name: recommendations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recommendations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recommendations_id_seq OWNER TO postgres;

--
-- Name: recommendations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recommendations_id_seq OWNED BY public.recommendations.id;


--
-- Name: recommendations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recommendations ALTER COLUMN id SET DEFAULT nextval('public.recommendations_id_seq'::regclass);


--
-- Data for Name: recommendations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recommendations (id, name, youtube_link, score) FROM stdin;
7	All Fight Scenes | Arcane: League of Legends	https://www.youtube.com/watch?v=vnYoxXYZN5g	0
16	Mario Sergio Cortella - Faça o Teu Melhor	https://www.youtube.com/watch?v=dd1bsHYYqjg	0
2	(Método Avançado) Tutorial Método Fridrich COMPLETO (Atualizado 2020) | Português-BR	https://www.youtube.com/watch?v=-uIhS-M4bIk	2
12	GUIA COMPLETO DE AEROPORTO COM CONEXÃO | PASSO A PASSO PARA SUA VIAGEM DE AVIÃO	https://www.youtube.com/watch?v=x5NRxUkNDy0	11
9	Arcane | Ekko vs. Jinx	https://www.youtube.com/watch?v=OkscEokV238	12
8	Imagine Dragons x J.I.D - Enemy (from the series Arcane League of Legends)	https://www.youtube.com/watch?v=D9G1VOjN_84	22
3	Aprenda RegEx do Zero! #1 O que são Expressões Regulares?	https://www.youtube.com/watch?v=TVIZoqBjwNQ	-1
15	Vaca Não Dá Leite - Mario Sergio Cortella	https://www.youtube.com/watch?v=cWW3hHkBpUk	19
6	Inteligência Artificial jogando Batatinha Frita 1,2,3 (Round 6)	https://www.youtube.com/watch?v=K_A-CpRbcGM	3
13	GOOGLE FLIGHTS | APRENDA A PESQUISAR OS MELHORES PREÇOS DE VOOS	https://www.youtube.com/watch?v=wuL6y5Sm_KI	1
11	Get Jinxed (ft. Djerv) | Official Music Video - League of Legends	https://www.youtube.com/watch?v=0nlJuwO0GDs	2
10	Arcane | Jinx Listening to "Get Jinxed" Scene	https://www.youtube.com/watch?v=qhs5DTaOzHU	3
14	PORQUE O CORTELLA FALA DE MANEIRA CANTADA | Cortes Mais que 8 Minutos	https://www.youtube.com/watch?v=mBBS6r0tPOw	1
17	Mario Sergio Cortella - O Tempo E A Vida	https://www.youtube.com/watch?v=Ek2LmQ5d6Jo	20
1	O Único Vídeo Que Você Precisa Sobre Como Controlar A Ansiedade	https://www.youtube.com/watch?v=dZJbORri0ro	10
5	Peanuts? When millions become irrelevant... 😳 😂 #shorts	https://www.youtube.com/watch?v=9Sr6p7vVTbc	-5
\.


--
-- Name: recommendations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recommendations_id_seq', 17, true);


--
-- Name: recommendations recommendations_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recommendations
    ADD CONSTRAINT recommendations_pk PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

