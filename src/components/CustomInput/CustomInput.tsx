import { InputLabel } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface Props {
    label: string;
    value: string;
    isPassword?: boolean;
    handleChange: (value: string) => void;
}

export const CustomInput = ({
    label,
    handleChange,
    value,
    isPassword = false,
}: Props) => {
    const handleType = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        handleChange(e.target.value);
    };

    return (
        <Box>
            <InputLabel
                sx={{
                    borderRadius: '8px',
                    padding: '0 5px',
                    width: 'fit-content',
                    marginLeft: '5px',
                    zIndex: '10',
                    transform: 'translateY(50%)',
                    backgroundColor: '#f2f2f2',
                }}
            >
                {label}
            </InputLabel>
            <TextField
                type={`${isPassword ? 'password' : 'text'}`}
                autoComplete="off"
                sx={{
                    backgroundColor: '#f2f2f2',
                    borderRadius: '3px',
                    width: '100%',
                }}
                onChange={handleType}
                value={value}
            />
        </Box>
    );
};
