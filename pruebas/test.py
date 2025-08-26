import cv2
import mediapipe as mp

# Inicializa Face Mesh
mp_face_mesh = mp.solutions.face_mesh  # type: ignore
mp_drawing = mp.solutions.drawing_utils  # type: ignore

cap = cv2.VideoCapture(0)

with mp_face_mesh.FaceMesh(
    max_num_faces=1,
    refine_landmarks=True,  # activa landmarks extra en ojos/labios
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5,
) as face_mesh:

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Convierte a RGB
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = face_mesh.process(rgb_frame)

        if results.multi_face_landmarks:
            for face_landmarks in results.multi_face_landmarks:
                # Dibuja la malla en la cara
                mp_drawing.draw_landmarks(
                    frame,
                    face_landmarks,
                    mp_face_mesh.FACEMESH_TESSELATION,
                    mp_drawing.DrawingSpec(
                        color=(0, 255, 0), thickness=1, circle_radius=1
                    ),
                    mp_drawing.DrawingSpec(color=(255, 0, 0), thickness=1),
                )

        cv2.imshow("Malla Facial - Presiona Q para salir", frame)

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

cap.release()
cv2.destroyAllWindows()
