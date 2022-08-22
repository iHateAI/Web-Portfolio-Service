import React, { useState } from "react";

function Certificate({ certificate, setCertificates, isEditable }) {
    const [isEditing, setIsEditing] = useState(false);
    
    return (
        <>
            {isEditing ? (
                <CertificateEditForm 
                    currentCertificate={certificate}
                    setCertificates={setCertificates}
                    setIsEditing={setIsEditing}
                />
            ) : (
                <CertificateCard 
                    certificate={certificate}
                    isEditable={isEditable}
                    setIsEditing={setIsEditing}
                />
            )}
        </>
    );
}

export default Certificate;