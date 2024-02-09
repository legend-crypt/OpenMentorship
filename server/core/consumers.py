import json
import uuid
from channels.generic.websocket import AsyncWebsocketConsumer

class CallConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = 'webrtc'
        self.room_group_name = f'webrtc_group_{self.room_name}'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        # print(text_data)
        data_json = json.loads(text_data)
        print(data_json.get('type'))
        message_type = data_json.get('type')
        if message_type == 'offer':
            # Handle offer or answer
            payload = data_json.get('payload')
            time = data_json.get('time')
            await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'send.offer',
                'payload': payload,
                'sender_channel_name': self.channel_name
            }
        )
        elif message_type == 'answer':
            payload = data_json.get('payload')
            candidate = data_json.get('candidate')
            sender_channel_name = data_json.get('sender_channel_name')

            await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'send.answer',
                'payload': payload,
                'candidate': candidate
            }
        )
        else:
            raise ValueError("No handler for message type %s" % message_type)

    async def send_answer(self, payload):
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'answer',
                'payload': payload,
                'candidate': candidate
            },
        )
        
    async def send_offer(self, event):
        payload = event['payload']        
        await self.send(text_data=json.dumps({
            'type': 'offer',
            'payload': payload
        }))

    async def send_answer(self, event):
        payload = event['payload']
        candidate = event['candidate']
        # Send offer or answer message to WebSocket
        await self.send(text_data=json.dumps({
            'type': 'answer',
            'payload': payload,
            'candidate': candidate
        }))
