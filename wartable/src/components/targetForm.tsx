// @ts-ignore
import React from 'react';
import { useForm } from 'react-hook-form';

export default function TargetForm(props: any) {
    const {register, handleSubmit, errors} = useForm();
    const onSubmit = (data: any) => {
        props.history.push(`/target/{data.title}/{data.url}/{data.path}`);
    }

    return (
        <div className="container form-container">
            <form onSubmit={handleSubmit(onSubmit)}>

                <label> Title  
                    <input type="text" name="title" ref={register({required: true})}/>
                    {errors.title && <span>A name is required</span>}
                </label>
                <br/>

                <label> URL
                    <input type="text" name="url" ref={register({required: true})}/>
                    {errors.url && <span>We need a URL to know what data you want!</span>}
                </label>
                <br/>

                <label> XPath
                    <input type="text" name="XPath" ref={register({required: true})}/>
                    {errors.XPath && <span>We need an XPath to know what data you want!</span>}
                </label>
                <br/>

                <input type="submit"/>
            </form>
        </div>
    )
}
