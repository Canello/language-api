import sys
import os
import openai
from dotenv import load_dotenv
load_dotenv()

openai.api_key = os.getenv('OPENAI_SECRET_KEY')

system_prompt = "You are an english teacher and I am a foreigner student. We are going to pretend we are having a casual conversation. Each time you talk back to me, you will divide your response in two sections separated by \"|\". In the first section you will point out my english errors. In the second section, you will keep talking about the conversation. Do not point out ponctuation errors or mispellings, focus on the vocabulary and whether the sentences make sense or not."

message = sys.stdin
print('message')
print(message)

messages=[{"role": "system", "content": system_prompt}]

completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )
response = completion.choices[0].message.content

sys.stdout.write(response)
sys.stdout.flush()