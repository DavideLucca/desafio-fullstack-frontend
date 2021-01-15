import React, { Component, useEffect, useState } from 'react';
import { render } from 'react-dom';
import { useForm } from 'react-hook-form';

import api from './services/api';

import './App.css';
import reactLogo from './assets/react.png';

import Header from './components/Header';
import Comments from './components/Comments';

export default function App() {
    const { register, handleSubmit } = useForm();
    const { 
        register: registerComment, 
        handleSubmit: handleSubmitComment
    } = useForm();

    const [posts, setPosts] = useState([]);
    const [showComments, setShowComments] = useState([]);

    useEffect(() => {
        api.get('posts').then(response => {
            setPosts(response.data);
            console.log(response);
        });
    }, []);

    async function handleAddPost(dados) {
        console.log('dados recebidos: ', dados);
        console.log('dados organizados: ', dados.post);

        const response = await api.post('posts', {
            // message: `Post ${Math.floor(Math.random() * 1001)} adicionado`
            message: dados.post
        });

        console.log(response);

        const post = response.data;

        setPosts([ ...posts, post ]);
    }

    const onSubmit = (data) => {
        console.log(data);
        // console.log({
        //     message: data.post
        // })
        handleAddPost(data);
    }

    const onSubmitComment = (data) => {
        console.log(data);
    }

    function openComments() {
        console.log(showComments);
        showComments ? setShowComments(false) : setShowComments(true);
    }

    return (
    <>
        <Header title="Desafio Fullstack"/>
        <hr />

        <form key={1} onSubmit={handleSubmit(onSubmit)}>
            <input type="text" id="inputPost" name="post" placeholder="Post" ref={register} />
            <br />
            <input type="submit" id="submitPost" value="Adicionar nova postagem"/>
        </form>

        <br />

        <ul>
            {posts.map(post => (
                <li id="postList" key={post.id}>
                    <b>{post.message}</b>
                    
                    <hr />

                    <Comments data={post.id}/>

                    {/* <form key={2} onSubmit={handleSubmitComment(onSubmitComment)}>
                        <input type="text" id="comment" name="comment" placeholder="Adicionar comentário" ref={registerComment}/>
                        <input type="submit" value="Adicionar comentário"/>
                    </form> */}
                    {/* <button onClick={openComments}>Comentários</button> */}
                    {/* { showComments ? <Comments data={post.id}/> : null } */}
                    
                </li>
            ))}
        </ul>

        {/* <button onClick={handleAddPost}>Adicionar</button> */}
    </>
    );
}