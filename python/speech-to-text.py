import sys
import os
import openai
from dotenv import load_dotenv
load_dotenv()

openai.api_key = os.getenv('OPENAI_SECRET_KEY')

audio_file_path = os.path.abspath(os.path.join(os.getcwd(), '..','javascript','uploads','audio.wav'))
audio_file = open(audio_file_path, 'rb')
transcript = openai.Audio.transcribe("whisper-1", audio_file)
sys.stdout.write(transcript.text)
sys.stdout.flush()