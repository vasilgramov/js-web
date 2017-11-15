import { ajaxData, beginAjax, ajaxError } from './ajaxData';
import toastr from 'toastr';

export default function fetchData() {
    return (dispatch) => {
        dispatch(beginAjax());
        return fetch('http://localhost:8080/contacts')
            .then(res => res.json(),
                error => {
                    toastr.error(error);
                    dispatch(ajaxError(error));
                })
            .then(json => {
                dispatch(ajaxData(json.contacts));
            });
    };
}