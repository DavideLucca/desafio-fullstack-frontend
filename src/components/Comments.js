import React, { Component, useEffect, useState } from 'react';
import { render } from 'react-dom';
import { useForm } from 'react-hook-form';

import api from '../services/api';

import '../App.css';

export default function Comments(props) {
    const { register, handleSubmit } = useForm();
    const [comments, setComments] = useState([]);

    const onSubmit = (data) => {
        console.log(data, props.data);
        const dados = {
            comment: data.comment,
            idPost: props.data
        }
        handleAddComment(dados);
    }

    function handleAddComment(dados) {
        console.log(dados);
    }

    return (
        <>
            <p id="commentId">ID: {props.data}</p>

            <form id="commentId" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" name="comment" placeholder="Comenstário" ref={register}/>
                <br />
                <input type="submit" id="submitPost" value="Adicionar comentário" />
            </form>

        </>
    )
}