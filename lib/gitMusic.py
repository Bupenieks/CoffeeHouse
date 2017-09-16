from pydub import AudioSegment
import os, sys

trackA = sys.argv[2]
trackB = sys.argv[3]
print(trackA)
export_path = sys.argv[1]

trackA = AudioSegment.from_file(trackA,format="mp3")
trackB = AudioSegment.from_file(trackB,format="mp3")
merged_track = trackA.overlay(trackB,position=1000)
file_handle = merged_track.export(export_path + "/merged_track.mp3",format="mp3")

sys.exit(0)