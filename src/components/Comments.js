import React, { Component, useEffect, useState } from 'react';
import { render } from 'react-dom';
import { useForm } from 'react-hook-form';

import api from '../services/api';

import '../App.css';

export default function Comments(props) {
    const { register, handleSubmit } = useForm();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        api.get(`posts/${props.data}/comments`).then(response => {
            console.log(response);
            setComments(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    const onSubmit = (data) => {
        console.log(data, props.data);
        const dados = {
            comment: data.comment,
            idPost: props.data
        }
        // api.get(`posts/${dados.idPost}/comments`).then(response => {
        //     setComments(response.data);
        //     console.log('Valores do GET:', response);
        // })
        // .catch(error => {
        //     console.log(error);
        // });

        handleAddComment(dados);
    }

    async function handleAddComment(dados) {
        console.log('dados a enviar: ', dados);
        
        const response = await api.post(`posts/${dados.idPost}/comments`, {
            comment: dados.comment
        });

        console.log(response);

        const comment = response.data;

        setComments([ ...comments, comment ]);
    }

    return (
        <>
            {/* <p id="commentId">ID: {props.data}</p> */}
            <p>Comentários:</p>
            <ul>
                {comments.map(com => (
                    <li id="commentList" key={com.id}>
                        {com.comment}
                    </li>
                ))}
            </ul>

            <form id="commentId" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" name="comment" placeholder="Comentário" ref={register}/>
                <br />
                {/* <button onClick={getComments}>Ver comentários</button> */}
                <input type="submit" id="submitPost" value="Adicionar comentário" />
            </form>

        </>
    )
}