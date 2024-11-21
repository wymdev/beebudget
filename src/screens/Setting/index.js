import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Switch,
    Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../actions/actions';
import { Ionicons, FontAwesome, Feather } from '@expo/vector-icons';
import styles from './styles'; // Import the styles from styles.js
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

export default function SettingScreen({ dispatchLogout }) {


    const username = useSelector((state) => state.auth.username);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        darkMode: false,
        emailNotifications: true,
        pushNotifications: false,
    });

    const handleLogout = () => {
        // Dispatch the logout action
        dispatch(logoutUser());
    };

    const [isLanguageSheetVisible, setLanguageSheetVisible] = useState(false);

    const bottomSheetModalRef = useRef(null);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.profile}>
                <TouchableOpacity
                    onPress={() => {
                        // handle onPress
                    }}>
                    <View style={styles.profileAvatarWrapper}>
                        <Image
                            alt=""
                            source={{
                                uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                            }}
                            style={styles.profileAvatar} />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            // handle onPress
                        }}>
                        <View style={styles.profileAction}>
                            <Feather color="#fff" name="edit-3" size={15} />
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>

                <View>
                    <Text style={styles.profileName}>{username || 'Guest' }</Text>
                    {/* <Text style={styles.profileAddress}>
                        123 Maple Street. Anytown, PA 17101
                    </Text> */}
                </View>
            </View>

            <ScrollView>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preferences</Text>

                    <TouchableOpacity
                        onPress={() => {
                            // handle onPress
                            handlePresentModalPress()
                        }}
                        style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: '#fe9400' }]}>
                            <Ionicons color="#fff" name="language" size={20} />
                        </View>

                        <Text style={styles.rowLabel}>Language</Text>

                        <View style={styles.rowSpacer} />

                        <Ionicons
                            color="#C6C6C6"
                            name="chevron-forward-outline"
                            size={20} />
                    </TouchableOpacity>

                    <View style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
                            <Ionicons color="#fff" name="moon" size={20} />
                        </View>

                        <Text style={styles.rowLabel}>Dark Mode</Text>

                        <View style={styles.rowSpacer} />

                        <Switch
                            onValueChange={darkMode => setForm({ ...form, darkMode })}
                            value={form.darkMode} />
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            // handle onPress
                        }}
                        style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
                            <Ionicons
                                color="#fff"
                                name="location-outline"
                                size={20} />
                        </View>

                        <Text style={styles.rowLabel}>Location</Text>

                        <View style={styles.rowSpacer} />

                        <Ionicons
                            color="#C6C6C6"
                            name="chevron-forward-outline"
                            size={20} />
                    </TouchableOpacity>

                    <View style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
                            <Ionicons color="#fff" name="mail" size={20} />
                        </View>

                        <Text style={styles.rowLabel}>Email Notifications</Text>

                        <View style={styles.rowSpacer} />

                        <Switch
                            onValueChange={emailNotifications =>
                                setForm({ ...form, emailNotifications })
                            }
                            value={form.emailNotifications} />
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
                            <Ionicons color="#fff" name="notifications" size={20} />
                        </View>

                        <Text style={styles.rowLabel}>Push Notifications</Text>

                        <View style={styles.rowSpacer} />

                        <Switch
                            onValueChange={pushNotifications =>
                                setForm({ ...form, pushNotifications })
                            }
                            value={form.pushNotifications} />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Resources</Text>

                    <TouchableOpacity
                        onPress={() => {
                            // handle onPress
                        }}
                        style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: '#8e8d91' }]}>
                            <Ionicons color="#fff" name="flag" size={20} />
                        </View>

                        <Text style={styles.rowLabel}>Report Bug</Text>

                        <View style={styles.rowSpacer} />

                        <Ionicons
                            color="#C6C6C6"
                            name="chevron-forward-outline"
                            size={20} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            // handle onPress
                        }}
                        style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
                            <Ionicons color="#fff" name="mail" size={20} />
                        </View>

                        <Text style={styles.rowLabel}>Contact Us</Text>

                        <View style={styles.rowSpacer} />

                        <Ionicons
                            color="#C6C6C6"
                            name="chevron-forward-outline"
                            size={20} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            // handle onPress
                        }}
                        style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
                            <Ionicons color="#fff" name="star" size={20} />
                        </View>

                        <Text style={styles.rowLabel}>Rate in App Store</Text>

                        <View style={styles.rowSpacer} />

                        <Ionicons
                            color="#C6C6C6"
                            name="chevron-forward-outline"
                            size={20} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={handleLogout}
                    style={styles.logoutButton}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
            <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    onChange={handleSheetChanges}
                >
                    <BottomSheetView style={styles.bottomSheetContainer}>
                        <TouchableOpacity style={styles.bottomSheetItem}>
                            <Text>English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bottomSheetItem}>
                            <Text>Spanish</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bottomSheetItem}>
                            <Text>French</Text>
                        </TouchableOpacity>
                    </BottomSheetView>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}
