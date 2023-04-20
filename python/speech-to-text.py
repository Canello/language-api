import sys
import os
import openai
from dotenv import load_dotenv
load_dotenv()

openai.api_key = os.getenv('OPENAI_SECRET_KEY')

audio_file_name = input()
audio_file_path = os.path.abspath(os.path.join(os.getcwd(), '..', 'javascript', 'uploads', audio_file_name))
# try:
#     audio_file = open(audio_file_path, 'rb')
#     transcript = openai.Audio.transcribe("whisper-1", audio_file)
# except:
transcript = {'text':'FAILED - path: ' + audio_file_path}
sys.stdout.write(transcript.text)
sys.stdout.flush()