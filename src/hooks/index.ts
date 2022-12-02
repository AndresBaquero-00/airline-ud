import React, { useEffect, useState } from "react";

export const useForm = function <T>(initialForm: T) {
    const [validForm, setValidForm] = useState(false);
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        const validForm = Object.values(form as {}).every(data => {
            if (Array.isArray(data)) {
                return (data.length !== 0) && (data.every(v => v !== ''));
            } else if (typeof data === 'string') {
                return (data !== '');
            } else if (typeof data === 'number') {
                return (data > 0);
            }
        });
        
        setValidForm(validForm);
    }, [form]);

    const changeForm = function ($e: React.ChangeEvent) {
        const target = $e.target as HTMLInputElement;
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value
        });
    }

    const resetForm = function () {
        setForm(initialForm);
    }

    const setDataForm = function (names: string[], values: unknown[]) {
        setForm(form => {
            let f: T = {...form};
            names.forEach((name, index) => {
                f = {
                    ...f,
                    [name]: values.at(index)
                };
            });

            return f;
        });
    }

    return {
        form,
        validForm,
        changeForm,
        resetForm,
        setDataForm
    }
}