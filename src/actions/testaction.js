// All actions should have type
export const TEST_ACTION ='TEST ACTION'

// ActionCreators must dispatch action with type and data (if needed)

// Test Action (discribe what happend)
const testAction = (message) => ({
    type: TEST_ACTION,
    message
})

export const testRun = (message) => (dispatch, setState) => {
    // dispatch Action
    dispatch(testAction(message));
} 