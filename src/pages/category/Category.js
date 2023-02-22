import './Category.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../../components/post/Post';

function Category(){

    const { slug } = useParams('slug');
    const [category, setCategory] = useState();
    const [title, setTitle] = useState();
    const [img, setImg] = useState("");
    const [content, setContent] = useState();

    useEffect(() => {
        axios.get(process.env.REACT_APP_API + '/public/slug/' + slug)
        .then(res => setCategory(res.data))
    }, [slug])

    function openPost(e){
        e.preventDefault();
        document.querySelector('.post-create').classList.toggle('post-create-on');
    }

    function createPost(){
        axios.post(process.env.REACT_APP_API + '/public/post-create', {
            post: content,
            title: title,
            photo: img,
            category_id: category?.[0]?.id
        })
        .then(res => {
            alert('Post Criado com sucesso');
            window.location.reload();
        })
    }

    return(
        <div className="container">
            <div className="category">
                <div className="title">
                    <h1>{category?.[0]?.name}</h1>
                </div>
                <div className="new-post">
                    <a href="#" onClick={(e) => openPost(e)}>+ new post</a>
                    <div className="post-create">
                        <div className="post-create-container">
                            <div className="create-line">
                                <legend>Title</legend>
                                <input type="text" name="title" id="title" onChange={(e) => setTitle(e.target.value)}/>
                            </div>
                            <div className="create-line">
                                <input type="file" name="file" id="file" onChange={(e) => setImg(e.target.files[0])}/>
                                <div></div>
                                <label htmlFor="file">Imagem</label>
                            </div>
                            <div className="create-line">
                                <legend>Content</legend>
                                <textarea name="content" id="content" cols="30" rows="10" onChange={(e) => setContent(e.target.value)}></textarea>
                            </div>
                            <div className="create-line">
                                <div></div>
                                <button onClick={createPost}>Create</button>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    category?.[0].post?.map((pst, i) => 
                        <Post data={pst} i={i} key={i} />
                    )
                }
            </div>
        </div>
    )
}

export default Category;