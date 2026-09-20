import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getCreatures } from "../../services/api";

import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import CreatureCard from "../../components/CreatureCard/CreatureCard";

import "./Home.css";

const Home = () => {
    const [featuredCreatures, setFeaturedCreatures] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadFeaturedCreatures = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getCreatures(1, 4);

                setFeaturedCreatures(
                    data.results || []
                );
            } catch (error) {
                console.error(error);

                setError(
                    "We couldn't open the enchanted library."
                );
            } finally {
                setLoading(false);
            }
        };

        loadFeaturedCreatures();
    }, []);

    return (
        <main className="home">

            {/* =========================
                HERO
            ========================= */}

            <section className="home__hero">

                <div className="home__stars home__stars--one">
                    ✦
                </div>

                <div className="home__stars home__stars--two">
                    ✧
                </div>

                <div className="home__stars home__stars--three">
                    ✦
                </div>

                <div className="home__stars home__stars--four">
                    ·
                </div>


                <div className="home__hero-content">

                    <span className="home__eyebrow">
                        ✦ The enchanted archives
                    </span>

                    <h1>
                        Enchanted
                        <span>
                            Library
                        </span>
                    </h1>

                    <p className="home__description">
                        A quiet collection of magical
                        knowledge, ancient creatures,
                        arcane spells and extraordinary
                        artifacts.
                    </p>

                    <Link
                        to="/creatures"
                        className="home__hero-button"
                    >
                        Explore the library
                        <span>→</span>
                    </Link>

                </div>


                <div className="home__hero-symbol">
                    ✦
                </div>

            </section>


            {/* =========================
                COLLECTION
            ========================= */}

            <section className="home__collection">

                <div className="home__section-heading">

                    <span>
                        The archives
                    </span>

                    <h2>
                        Explore the collection
                    </h2>

                    <p>
                        Discover the different sections
                        preserved within the library.
                    </p>

                </div>


                <div className="home__collection-grid">

                    {/* CREATURES */}

                    <Link
                        to="/creatures"
                        className="home__collection-card"
                    >

                        <div className="home__collection-symbol">
                            ✦
                        </div>

                        <span>
                            Volume I
                        </span>

                        <h3>
                            Creatures
                        </h3>

                        <p>
                            Discover magical beings,
                            ancient monsters and
                            extraordinary inhabitants.
                        </p>

                        <strong>
                            Explore
                            <span>→</span>
                        </strong>

                    </Link>


                    {/* SPELLS */}

                    <Link
                        to="/spells"
                        className="home__collection-card"
                    >

                        <div className="home__collection-symbol">
                            ✦
                        </div>

                        <span>
                            Volume II
                        </span>

                        <h3>
                            Spells
                        </h3>

                        <p>
                            Explore arcane incantations,
                            rituals and forgotten magical
                            knowledge.
                        </p>

                        <strong>
                            Explore
                            <span>→</span>
                        </strong>

                    </Link>


                    {/* MAGIC ITEMS */}

                    <Link
                        to="/items"
                        className="home__collection-card"
                    >

                        <div className="home__collection-symbol">
                            ✦
                        </div>

                        <span>
                            Volume III
                        </span>

                        <h3>
                            Magic Items
                        </h3>

                        <p>
                            Discover enchanted objects,
                            legendary artifacts and
                            mysterious relics.
                        </p>

                        <strong>
                            Explore
                            <span>→</span>
                        </strong>

                    </Link>

                </div>

            </section>


            {/* =========================
                FEATURED CREATURES
            ========================= */}

            <section className="home__featured">

                <div className="home__featured-heading">

                    <div>

                        <span>
                            From the archives
                        </span>

                        <h2>
                            Featured creatures
                        </h2>

                    </div>

                    <Link
                        to="/creatures"
                        className="home__view-all"
                    >
                        View collection
                        <span>→</span>
                    </Link>

                </div>


                {/* LOADING */}

                {loading && (
                    <Loader />
                )}


                {/* ERROR */}

                {!loading && error && (
                    <ErrorMessage
                        message={error}
                    />
                )}


                {/* FEATURED RESULTS */}

                {!loading &&
                    !error &&
                    featuredCreatures.length > 0 && (

                        <div className="home__featured-grid">

                            {featuredCreatures.map(
                                (creature, index) => (
                                    <CreatureCard
                                        key={
                                            creature.slug ||
                                            creature.key ||
                                            index
                                        }
                                        creature={creature}
                                    />
                                )
                            )}

                        </div>

                    )}

            </section>


            {/* =========================
                QUOTE
            ========================= */}

            <section className="home__quote">

                <div className="home__quote-symbol">
                    ✦
                </div>

                <p>
                    "Every page holds a story.
                    Every creature, a secret."
                </p>

                <span>
                    — Keeper of the Archives
                </span>

            </section>

        </main>
    );
};

export default Home;