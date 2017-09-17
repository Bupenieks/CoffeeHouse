
print("HELLO")
sys.exit(0)



path = os.getcwd()+ "\\"

export_path = './public/'
base_track_file = sys.argv[2]
overlay_track_file = sys.argv[3]
#pos = int(sys.argv[4])
pos = 1000

base_track = AudioSegment.from_file(base_track_file,format="mp3")
overlay_track = AudioSegment.from_file(overlay_track_file,format="mp3")

print("hello")
sys.exit(0)

if (pos < 0):
    merge_track = AudioSegment.silent(duration = len(base_track) - pos)
    merge_track = merge_track.overlay(overlay_track)
    merge_track = merge_track.overlay(base_track,position=-pos)
else:
    merge_track = base_track.overlay(overlay_track,position=pos)

file_handle = merge_track.export(export_path + "merged.mp3",format="mp3")

print(export_path)
sys.exit(0)
