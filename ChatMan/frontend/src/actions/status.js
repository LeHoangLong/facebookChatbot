export const Status = {
    IDLE: 'IDLE',
    FETCHING: 'FETCHING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    IN_PROGRESS: 'IN_PROGRESS'    
};

Object.freeze(Status);

export const setStatus = (name, status, detail='') => ({
    type: 'SET_STATUS',
    payload: {
        name: name,
        status: status,
        detail: detail
    }
})