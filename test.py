import cv2
import face_recognition

# encuentra en que puertos esta disponible la camara
# for i in range(3):  # prueba con 0,1,2
#     cap = cv2.VideoCapture(i)
#     if cap.isOpened():
#         print(f"Camara {i} disponible")
#     cap.release()

# Inicia la cámara
video_capture = cv2.VideoCapture(2)

while True:
    # Captura frame por frame
    ret, frame = video_capture.read()

    # Convierte a RGB (face_recognition trabaja en RGB)
    rgb_frame = frame[:, :, ::-1]

    # Detecta ubicaciones de rostros en el frame
    face_locations = face_recognition.face_locations(rgb_frame)

    # Dibuja rectángulos en cada cara encontrada
    for top, right, bottom, left in face_locations:
        cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)

    # Muestra el resultado
    cv2.imshow("Video - Presiona Q para salir", frame)

    # Salir con la tecla Q
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

video_capture.release()
cv2.destroyAllWindows()

print(hello)
