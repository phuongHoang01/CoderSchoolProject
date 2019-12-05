const initialState = [
    {
        "id": 1,
        "name": "Detect National ID template from photo",
        "value": false
    },

    {
        "id": 2,
        "name": "Filling form and compare with the result from Nation ID OCR result ",
        "value": false
    },

    {
        "id": 3,
        "name": "Capture face from camera and compare with the face from Nation ID card",
        "value": false
    },

    {
        "id": 4,
        "name": "Show the final result",
        "value": false
    },

]

export default function (state = initialState,action){
    console.log("step here"); 
    console.log(action.type)
    switch(action.type){
        case "template" : state[0].value=true; return state;
        case "ocr" : state[1].value=true; return state;
        case "face" : state[2].value=true; return state;
        case "result" :state[3].value=true; return state;
        default : return state;
    }
}