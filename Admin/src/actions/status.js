export const Status = {
    IDLE: 0,
    FETCHING: 1,
    SUCCESS: 2,
    ERROR: 3    
};

Object.freeze(Status);

export const setStatus = (name, status, detail) => ({
    type: 'SET_STATUS',
    payload: {
        name: name,
        status: status,
        detail: detail
    }
})