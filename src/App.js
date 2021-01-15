import React, { Component, useEffect, useState } from 'react';
import { render } from 'react-dom';
import { useForm } from 'react-hook-form';

import api from './services/api';

import './App.css';
import reactLogo from './assets/react.png';

import Header from './components/Header';
import Comments from './components/Comments';

export default function App() {
    const { register, handleSubmit, reset } = useForm();

    const [posts, setPosts] = useState([]);
    const [showComments, setShowComments] = useState([]);

    useEffect(() => {
        api.get('posts').then(response => {
            setPosts(response.data);
        });
    }, []);

    async function handleAddPost(dados) {

        const response = await api.post('posts', {
            message: dados.post
        });

        reset({});

        const post = response.data;

        setPosts([ ...posts, post ]);
    }

    const onSubmit = (data) => {

        handleAddPost(data);
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

        <ul id="postUl">
            {posts.map(post => (
                <li id="postList" key={post.id}>
                    <b>{post.message}</b>
                    
                    <hr />

                    <Comments data={post.id}/>
                    
                </li>
            ))}
        </ul>
    </>
    );
}