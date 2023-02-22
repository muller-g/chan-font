import { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import Icon from '@mdi/react';
import { mdiThumbUp } from '@mdi/js';

function Home(){
    
    const [categories, setCategories] = useState();
    const [posts, setPosts] = useState();

    useEffect(() => {
        axios.get(process.env.REACT_APP_API + '/public/categories')
        .then(res => setCategories(res.data));

        axios.get(process.env.REACT_APP_API + '/public/likes')
        .then(res => setPosts(res.data));
    }, [])

    return(
        <div className="container">
            <div className="home">
                <div className="logo-chan">
                    <a href="/">Logo</a>
                </div>
                <div className="about">
                    <div className="about-top">
                        <h2>About us</h2>
                    </div>
                    <div className="about-content">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo earum numquam magni debitis in, soluta nesciunt impedit optio maiores fugiat assumenda officia deserunt mollitia expedita unde consequuntur, atque obcaecati tempora.
                        Quis nemo voluptatem eaque, sed quisquam ipsam dignissimos consequatur dolorem incidunt accusantium possimus reiciendis cumque sit cupiditate vitae explicabo similique nobis aspernatur! Velit illo necessitatibus est aut dolorum maiores unde?
                        Facere itaque ipsum, officia, cupiditate porro commodi tempore asperiores pariatur sint perferendis consectetur quis. Accusamus praesentium provident aliquam voluptatibus minima debitis eligendi distinctio fugiat dignissimos dolores? Ab, necessitatibus.</p>
                    </div>
                </div>
                <div className="categories">
                    <div className="categories-top">
                        <h2>Topics</h2>
                    </div>
                    <div className="categories-links">
                        {
                            categories?.map((category, i) => 
                                <a key={i+1} href={'/category/' + category.slug} target='_blank'>{category.name}</a>
                            )
                        }
                    </div>
                </div>
                <div className="categories">
                    <div className="categories-top">
                        <h2>Most liked posts</h2>
                    </div>
                    <div className="categories-links">
                        {
                            posts?.map((post, i) => 
                                <a key={i} href={'#'} target='_blank'>{post.title} <Icon path={mdiThumbUp}/> {post.likes}</a>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;