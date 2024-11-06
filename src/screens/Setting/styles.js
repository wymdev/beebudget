import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    /** Profile */
    profile: {
        padding: width * 0.06, // 6% of the screen width
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height * 0.04, // 3% of the screen height
    },
    profileAvatarWrapper: {
        position: 'relative',
    },
    profileAvatar: {
        width: width * 0.2, // 20% of the screen width
        height: width * 0.2, // same as width to keep it square
        borderRadius: 9999,
    },
    profileName: {
        marginTop: height * 0.02, // 2% of the screen height
        fontSize: width * 0.05, // 5% of the screen width
        fontWeight: '600',
        color: '#414d63',
        textAlign: 'center',
    },
    profileAction: {
        position: 'absolute',
        right: width * -0.01, // slightly offset based on screen width
        bottom: height * -0.015,
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.07, // scaled with screen width
        height: width * 0.07,
        borderRadius: 9999,
        backgroundColor: '#007bff',
    },
    profileAddress: {
        marginTop: height * 0.01,
        fontSize: width * 0.04,
        color: '#989898',
        textAlign: 'center',
    },
    /** Section */
    section: {
        paddingHorizontal: width * 0.06,
    },
    sectionTitle: {
        paddingVertical: height * 0.015,
        fontSize: width * 0.03,
        fontWeight: '600',
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: 1.1,
    },
    /** Row */
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: height * 0.07,
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        marginBottom: height * 0.015,
        paddingHorizontal: width * 0.03,
    },
    rowIcon: {
        width: width * 0.08,
        height: width * 0.08,
        borderRadius: 9999,
        marginRight: width * 0.03,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowLabel: {
        fontSize: width * 0.045,
        fontWeight: '400',
        color: '#0c0c0c',
    },
    rowSpacer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    /** Logout Button */
    logoutButton: {
        alignSelf: 'center',
        backgroundColor: '#ff4757',
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.06,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: height * 0.03,
        width: width * 0.87, // Set width to 80% of the screen width
    },

    logoutButtonText: {
        color: '#fff',
        fontSize: width * 0.04,
        fontWeight: '600',
    },
    bottomSheetContent: {
        padding: 16,
    },
    bottomSheetTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    bottomSheetItem: {
        fontSize: 16,
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    bottomSheetContainer: {
        padding: 24,
        backgroundColor: 'white',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },

});

export default styles;
