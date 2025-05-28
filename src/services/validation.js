export const EMAIL_VALIDATION ={
                required:'email is required',
                pattern:{
                  value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message:'Email not valid, enter a valid email'
                }}
