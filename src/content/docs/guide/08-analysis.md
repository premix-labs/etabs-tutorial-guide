---
title: การวิเคราะห์และผลลัพธ์ (Analysis & Results)
description: การสั่งรันวิเคราะห์และดูผลลัพธ์แรงในโครงสร้าง
sidebar:
  order: 8
---

ก่อนกดปุ่ม Run Analysis เราต้องเตรียมการวิเคราะห์ให้ถูกต้องตามหลักวิศวกรรมอาคารสูง

## 1. การตรวจสอบโมเดล (Check Model)

เพื่อป้องกัน Error ระหว่างการคำนวณ ให้ไปที่ **Analyze > Check Model**:

- ติ๊กเลือกทุกช่อง (Joints, Frames, Shells, Loads)
- กด **OK** แล้วรอโปรแกรมตรวจสอบ
- **เป้าหมาย:** ต้อง **ไม่มี Error ที่กระทบเสถียรภาพหรือผลวิเคราะห์** (Warning บางรายการอาจยอมรับได้ แต่ต้องตรวจสอบความหมายก่อน)

---

## 2. ตั้งค่า P-Delta Analysis

ผลของ P-Delta (Secondary Moment จากแรงโน้มถ่วงเมื่อตึกโยกตัว) สำคัญมากสำหรับตึกสูง!

1.  ไปที่ **Define > P-Delta Options**
2.  เลือก **Iterative - Based on Loads**
3.  ใส่ Gravity Load สำหรับ P-Delta ตาม **Design Basis ของโครงการ**
    - ตัวอย่าง: 1.2 Dead + 1.2 SDL + 1.2 Live
4.  กด **OK**

---

## 3. ตั้งค่า Modal Analysis (โหมดการสั่น)

1.  ไปที่ **Define > Modal Cases**
2.  แก้ไข Case ชื่อ `Modal`
3.  **Maximum Number of Modes:** สำหรับตึกสูง ควรใช้อย่างน้อย `3 x จำนวนชั้น` (เช่น ตึก 20 ชั้น ควรใช้ 60 โหมด) เพื่อให้ Mass Participation Ratio เกิน 90%
4.  กด **OK**

---

## 4. สั่งคำนวณ (Run Analysis)

กดปุ่ม **Run Analysis** (▶️) หรือกด F5 โปรแกรมจะล็อกโมเดลและเริ่มคำนวณ

---

## 5. การดูผลลัพธ์ (Display Results)

### A. Deformed Shape (การเสียรูป)

กด F6 หรือไปที่ **Display > Deformed Shape**:

- ดูการโยกตัวจากแรงลม/แผ่นดินไหว
- ดู Animation เพื่อเช็คพฤติกรรมอาคาร (เช่น ตึกบิดตัวหรือไม่?)

### B. Force/Stress Diagrams (แรงภายใน)

กด F8 หรือไปที่ **Display > Force/Stress Diagrams**:

- **Frame Forces:** ดู Moment 3-3 (โมเมนต์ดัดหลัก), Shear 2-2 (แรงเฉือน) ในคานและเสา
- **Shell Stresses:** ดู M11/M22 ในพื้นหรือผนัง

### C. Check Building Response (สำคัญสำหรับตึกสูง)

ไปที่ **Display > Story Response Plots**:

- **Max Story Displacement:** ระยะเคลื่อนตัวสูงสุดแต่ละชั้น
- **Story Drifts:** อัตราส่วนการเคลื่อนตัวสัมพัทธ์ระหว่างชั้น (ต้องไม่เกิน 0.005 - 0.020 แล้วแต่มาตรฐาน)

---

## ✍️ Tutorial: ตรวจสอบผลคอนโด 30 ชั้น (ต่อ)

### 1. P-Delta & Modal

- **P-Delta:** ตั้งค่า Gravity Load ตาม Design Basis (ตัวอย่าง 1.2DL + 1.2SDL + 1.2LL)
- **Modal:** ตั้งค่า Max Modes = `90` โหมด (3 x 30 ชั้น)

### 2. Run Analysis

กด F5 และรอจนเสร็จ (เนื่องจากตึกสูง 30 ชั้น อาจใช้เวลาคำนวณนานขึ้นเล็กน้อย)

### 3. Check Results

1.  **Deformed Shape (F6):** เลือกเคส `WindX` ดูอาการโยกของตึก
2.  **Story Drift:** ไปที่ _Display > Story Response Plots_
    - เลือก Case: `EQx`
    - ดูค่า **Max Drift** ต้องไม่เกิน `0.005` (หรือตาม Code ที่กำหนด)
    - _ถ้าเกิน:_ ต้องเพิ่มความหนาผนังลิฟต์ Shear Wall หรือเพิ่มขนาดเสา

ถ้าผ่านแล้ว ไปลุยดีไซน์เหล็กเสริมในบทที่ 9 กันเลย!
