import React from 'react';
import useInterviewStore from '../store/useInterviewStore';

const ErrorsProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const errors = useInterviewStore((store) => store.errors);

    return (
        <>  
            {errors.length > 0 && (
                <div className="bg-red-500 text-white p-4 my-2 rounded-sm">
                    {errors.map((error, index) => (
                        <div key={index}>{error.message}</div>
                    ))}
                </div>
            )}
            {children}
        </>
    );
};

export default ErrorsProvider;
