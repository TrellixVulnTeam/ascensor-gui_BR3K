import face_recognition as fr
import cv2
import sys
import pickle as pk
import os

'''
command line args: imgfile, name_of_person_in_image
'''

s, img, name = sys.argv

os.chdir('src/scripts/')
if os.path.exists('faces') == False:
    os.mkdir('faces')

if img == "cam":
    cam = cv2.VideoCapture(0)

    while True:
        ret, frame = cam.read()
        cv2.imshow('Presiona A para guardar su rostro', frame)
        dir_path = os.path.dirname(os.path.realpath(__file__)) + "/faces/"
        if cv2.waitKey(10) & 0xFF == ord('a'):
            cv2.imwrite(dir_path + name + '.jpg', frame)
            break
cam.release()
cv2.destroyAllWindows()
