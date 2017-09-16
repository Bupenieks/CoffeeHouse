from pydub import AudioSegment
import os

path = os.getcwd() + "\\tracks\\"
export_path = path + "export\\"

track1 = AudioSegment.from_file(path + "track1.mp3",format="mp3")
track2 = AudioSegment.from_file(path + "track2.mp3",format="mp3")
merged_track = track1.overlay(track2,position=1000)
file_handle = merged_track.export(export_path + "merged_track.mp3",format="mp3")
