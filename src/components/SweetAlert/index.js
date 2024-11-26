import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Modal, Text, TouchableOpacity, View, StyleSheet, Alert } from "react-native";
import { BlurView } from "expo-blur";
import * as Animatable from "react-native-animatable";

const style = StyleSheet.create({
  customSweetAlertOuter: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dimmed modal background
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  customSweetAlertBox: {
    width: "90%",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    overflow: "hidden", // Ensures the blur effect stays within the box.
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Add a slight white tint for better contrast
  },
  customSweetAlertIcon: {
    height: 70,
    width: 70,
    borderColor: "#009ddf",
    borderWidth: 2,
    borderRadius: 160,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  customAlertIconFa: { color: "#009ddf" },
  customSweetAlertTitle: {
    fontSize: 20,
    color: "rgba(0,0,0,0.7)",
    marginBottom: 5,
    textAlign: "center",
  },
  customSweetAlertText: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    marginBottom: 15,
  },
  customSweetAlertButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center buttons horizontally
    marginTop: 10,
    gap: 10,
  },
  customSweetAlertButton: {
    height: 35,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  customSweetAlertButtonText: { fontSize: 16 },
});

const SweetAlert = forwardRef((props, ref) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [cancelButtonText, setCancelButtonText] = useState("");
  const [confirmButtonText, setConfirmButtonText] = useState("");
  const [onConfirm, setOnConfirm] = useState(() => {});
  const [onClose, setOnClose] = useState(() => {});
  const [iconName, setIconName] = useState("");
  const [iconColor, setIconColor] = useState("");

  const handleConfirm = () => {
    setShowModal(false);
    onConfirm();
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => onClose(), 200);
  };

  useImperativeHandle(ref, () => ({
    showSweetAlert: ({
      title,
      text,
      showCancelButton,
      cancelButtonText,
      confirmButtonText,
      onConfirm,
      onClose,
      type,
    }) => {
      setTitle(title);
      setText(text);
      setShowCancelButton(showCancelButton);
      setCancelButtonText(cancelButtonText);
      setConfirmButtonText(confirmButtonText);
      setOnConfirm(() => onConfirm);
      setOnClose(() => onClose);

      switch (type) {
        case "info":
          setIconName("info");
          setIconColor("#3498db");
          break;
        case "success":
          setIconName("check");
          setIconColor("#2ecc71");
          break;
        case "danger":
          setIconName("times");
          setIconColor("#e74c3c");
          break;
        case "warning":
          setIconName("exclamation");
          setIconColor("#f39c12");
          break;
        default:
          setIconName("");
          setIconColor("");
          break;
      }

      setShowModal(true);
    },
  }));

  return (
    <Modal animationType="fade" visible={showModal} transparent={true}>
      <View style={style.customSweetAlertOuter}>
        <Animatable.View animation="bounceIn">
          <BlurView intensity={90} style={style.customSweetAlertBox}>
            <Animatable.View
              animation="jello"
              duration={500}
              style={[style.customSweetAlertIcon, { borderColor: iconColor }]}
            >
              <Animatable.View duration={1600} animation="rubberBand">
                <FontAwesome5 size={38} style={[style.customAlertIconFa, { color: iconColor }]} name={iconName} />
              </Animatable.View>
            </Animatable.View>
            <Text style={style.customSweetAlertTitle}>{title}</Text>
            <Text style={style.customSweetAlertText}>{text}</Text>
            <View style={style.customSweetAlertButtons}>
              {showCancelButton && (
                <TouchableOpacity
                  onPress={closeModal}
                  style={[style.customSweetAlertButton, { backgroundColor: "#e74c3c" }]}
                >
                  <Text style={[style.customSweetAlertButtonText, { color: "#fff" }]}>{cancelButtonText}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={handleConfirm}
                style={[style.customSweetAlertButton, { backgroundColor: "#52E78C" }]}
              >
                <Text style={[style.customSweetAlertButtonText, { color: "#000" }]}>{confirmButtonText}</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Animatable.View>
      </View>
    </Modal>
  );
});

export default SweetAlert;
