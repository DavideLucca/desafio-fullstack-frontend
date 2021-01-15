import React, { Component, useEffect, useState } from 'react';
import { render } from 'react-dom';
import { useForm } from 'react-hook-form';

import api from '../services/api';

import '../App.css';

export default function Comments(props) {
    const { register, handleSubmit, reset } = useForm();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        api.get(`posts/${props.data}/comments`).then(response => {
            setComments(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    const onSubmit = (data) => {
        const dados = {
            comment: data.comment,
            idPost: props.data
        }

        handleAddComment(dados);
    }

    async function handleAddComment(dados) {
        
        const response = await api.post(`posts/${dados.idPost}/comments`, {
            comment: dados.comment
        });

        reset({});

        const comment = response.data;

        setComments([ ...comments, comment ]);
    }

    return (
        <>
            <p>Comentários:</p>
            <ul id="commentsUl">
                {comments.map(com => (
                    <li id="commentList" key={com.id}>
                        {com.comment}
                    </li>
                ))}
            </ul>

            <form id="commentId" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" name="comment" placeholder="Comentário" ref={register}/>
                <br />
                <input type="submit" id="submitPost" value="Adicionar comentário" />
            </form>

        </>
    )
}