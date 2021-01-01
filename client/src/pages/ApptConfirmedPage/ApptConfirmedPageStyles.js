const styles = (theme) => ({
    container: {
        width: '60%',
        minWidth: 300,
        margin: '0 auto'
    },

    title: { textAlign: 'center' },

    zoomInfo: {
        display: 'flex',
        fontStyle: 'italic',
        justifyContent: 'center',

        '& img': {
            width: 50,
            height: 50,
            marginRight: 15
        }
    },

    summary: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '20px 0',

        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        }
    },

    card: {
        width: '40%',
        maxWidth: 430
    },

    details: {
        fontSize: '1rem',
        fontWeight: 'bold',
        marginLeft: 15
    },

    redirectButton: {
        marginTop: 30,
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        border: 'none',
        color: '#FFF',
        borderRadius: 15,
        backgroundColor: '#ED1B2F',
        padding: '10px 15px',

        '&:focus': { outline: 'none' }
    }
});
export default styles;