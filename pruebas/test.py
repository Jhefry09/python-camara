# import cv2
# import face_recognition

# # encuentra en que puertos esta disponible la camara
# # for i in range(3):  # prueba con 0,1,2
# #     cap = cv2.VideoCapture(i)
# #     if cap.isOpened():
# #         print(f"Camara {i} disponible")
# #     cap.release()

# # Inicia la cámara
# video_capture = cv2.VideoCapture(2)

# while True:
#     # Captura frame por frame
#     ret, frame = video_capture.read()

#     # Convierte a RGB (face_recognition trabaja en RGB)
#     rgb_frame = frame[:, :, ::-1]

#     # Detecta ubicaciones de rostros en el frame
#     face_locations = face_recognition.face_locations(rgb_frame)

#     # Dibuja rectángulos en cada cara encontrada
#     for top, right, bottom, left in face_locations:
#         cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)

#     # Muestra el resultado
#     cv2.imshow("Video - Presiona Q para salir", frame)

#     # Salir con la tecla Q
#     if cv2.waitKey(1) & 0xFF == ord("q"):
#         break

# video_capture.release()
# cv2.destroyAllWindows()

# import cv2
# import face_recognition

# # Inicia la cámara
# video_capture = cv2.VideoCapture(2)

# while True:
#     ret, frame = video_capture.read()
#     if not ret:
#         break

#     # Convierte a RGB (face_recognition trabaja en RGB)
#     rgb_frame = frame[:, :, ::-1]

#     # Detecta ubicaciones de rostros y landmarks
#     face_locations = face_recognition.face_locations(rgb_frame)
#     face_landmarks_list = face_recognition.face_landmarks(rgb_frame, face_locations)

#     # Dibuja rectángulos y la malla
#     for (top, right, bottom, left), face_landmarks in zip(face_locations, face_landmarks_list):
#         # Rectángulo de la cara
#         cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)

#         # Malla de puntos (landmarks)
#         for feature, points in face_landmarks.items():
#             for point in points:
#                 cv2.circle(frame, point, 2, (0, 0, 255), -1)  # punto rojo
#                 # Si quieres unir puntos, dibuja líneas
#                 for i in range(1, len(points)):
#                     cv2.line(frame, points[i - 1], points[i], (255, 0, 0), 1)

#     # Muestra el resultado
#     cv2.imshow("Video - Presiona Q para salir", frame)

#     # Salir con la tecla Q
#     if cv2.waitKey(1) & 0xFF == ord("q"):
#         break

# video_capture.release()
# cv2.destroyAllWindows()


import cv2
import face_recognition

video_capture = cv2.VideoCapture(2)

while True:
    ret, frame = video_capture.read()
    if not ret:
        break

    rgb_frame = frame[:, :, ::-1]

    face_landmarks_list = face_recognition.face_landmarks(rgb_frame)

    for face_landmarks in face_landmarks_list:
        for facial_feature in face_landmarks.keys():
            points = face_landmarks[facial_feature]
            for point in points:
                cv2.circle(frame, point, 0, (0, 255, 0), -1)

    cv2.imshow("Video - Malla Facial", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

video_capture.release()
cv2.destroyAllWindows()
