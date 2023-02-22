import './Post.css'
import Icon from '@mdi/react';
import { mdiThumbUp } from '@mdi/js';
import { mdiThumbDown } from '@mdi/js';
import PostAnswers from '../post_answers/PostAnswers';
import axios from 'axios';
import { useState } from 'react';

function Post({data, i}){

    const [likes, setLikes] = useState(data?.likes ? data?.likes : 0);
    const [dislikes, setDisLikes] = useState(data?.dislikes ? data?.dislikes : 0);
    
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [img, setImg] = useState("asdasds");

    function setCount(n, id){
        axios.post(process.env.REACT_APP_API + '/public/post-vote', {
            post_id: id,
            vote_opt: n,
        })
        .then(res => {
            alert('voto contabilizado');
        })
    }

    function openReply(e, i){
        e.preventDefault();
        document.querySelectorAll('.answer-reply')[i].classList.toggle('answer-reply-open')
    }

    function createReply(id){
        axios.post(process.env.REACT_APP_API + '/public/post-reply', {
            post_id: id,
            content: content,
            photo: img,
            title: title,
        })
        .then(res => {
            alert('comentario concluido com sucesso');
            window.location.reload();
        })
    }

    return(
        <div className="post">
            <div className="post-title">
                <h1>{data?.title}</h1>
            </div>
            <div className="post-count">
                <div className="like">
                    <button onClick={() => setCount(1, data?.id)}><Icon path={mdiThumbUp}/></button><span id="span-like">{likes}</span>
                </div>
                <div className="dislike">
                    <button onClick={() => setCount(0, data?.id)}><Icon path={mdiThumbDown}/></button><span id="span-dislike">{dislikes}</span>
                </div>
            </div>
            <div className="post-content">
                <div className="content-photo">
                    <img src={data?.photo} alt="user img post" />
                </div>
                <div className="content-text">
                    <p>{data?.post}</p>
                    <div className="post-answers">
                        {
                            data?.post_answer?.map((resp, i) => 
                                <PostAnswers key={i} data={resp} />
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="post-create-answer">
                <a href="#" onClick={(e) => openReply(e, i)}>+ new reply</a>
                <div className="answer-reply">
                    <input type="text" id="title" name="title" placeholder='Title' onChange={(e) => setTitle(e.target.value)}/>
                    <input type="text" id="comment" name="comment" placeholder='Comment' onChange={(e) => setContent(e.target.value)}/>
                    <input type="file" id="file" name="file" onChange={(e) => setImg(e.target.files[0])}/>
                    <button onClick={(e) => createReply(data?.id)}>Reply</button>
                </div>
            </div>
        </div>
    )
}

export default Post;