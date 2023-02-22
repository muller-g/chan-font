import './PostAnswers.css';

function PostAnswers({data}){
    return(
        <div className="post-answers">
            <p>- {data.content} / <span>{data.created_at.slice(11, 16)} - {data.created_at.slice(0, 10).split("-").reverse().join('/')}</span></p>
        </div>
    )
}

export default PostAnswers;