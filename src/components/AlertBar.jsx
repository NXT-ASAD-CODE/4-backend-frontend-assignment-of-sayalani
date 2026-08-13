import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

function AlertBar() {
    const [showAlert, setShowAlert] = useState(true);

    const closeAlert = () => {
        setShowAlert(false);
    };

    if (!showAlert) {
        return null;
    }

    return (
        <div className="AlertBar">
            <p>
                Sign up and get 20% off to your first order.
                <span> Sign Up Now </span>
            </p>

            <CloseIcon
                onClick={closeAlert}
                sx={{
                    color: "#FFFFFF",
                    position: "absolute",
                    right: {
                        xs: "15px",
                        sm: "25px",
                        md: "40px",
                        lg: "60px",
                    },
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: {
                        xs: "18px",
                        sm: "20px",
                    },
                    cursor: "pointer",
                }}
            />
        </div>
    );
}

export default AlertBar;