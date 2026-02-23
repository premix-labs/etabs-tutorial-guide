---
title: น้ำหนักบรรทุกและการรวมแรง (Loading & Combinations)
description: การกำหนด Load Cases, Load Patterns และ Load Combinations
sidebar:
  order: 6
---

ในบทนี้เราจะกำหนดแรงกระทำ (Loads) ทั้งหมดที่กระทำกับอาคาร

## 1. Load Patterns (รูปแบบน้ำหนักบรรทุก)

ไปที่ **Define > Load Patterns** เพื่อสร้างกล่องเก็บแรง:

- **Dead:** น้ำหนักตัวเอง (Software คิดให้เองถ้า Self Weight Multiplier = 1)
- **SuperDead (SDL):** น้ำหนักวัสดุตกแต่ง, ผนังก่ออิฐ
- **Live:** น้ำหนักจรใช้งานจริง

### แรงลม (Wind Load)

ตั้งชื่อ `WindX` / `WindY`, เลือก Type: `Wind`, Auto Lateral Load: `ASCE 7-16`

- กด **Modify Lateral Load** เพื่อกำหนดความเร็วลม (Basic Wind Speed), Exposure Category (B/C/D), และ Wind Direction

### แรงแผ่นดินไหว (Seismic Load - Static)

ตั้งชื่อ `EQx` / `EQy`, เลือก Type: `Seismic`, Auto Lateral Load: `ASCE 7-16`

- **Ss, S1:** ค่าระดับความรุนแรงของแผ่นดินไหว (ดูจาก มยผ. หรือ กฎกระทรวง)
- **R Factor:** ตัวคูณลดแรง (เช่น 8.0 สำหรับ Special Moment Frame) เพื่อยอมให้โครงสร้างเสียหายได้บ้างแต่ไม่พังถล่ม

---

## 2. Mass Source (แหล่งกำเนิดมวล)

สำคัญมากสำหรับการวิเคราะห์แผ่นดินไหว! ไปที่ **Define > Mass Source**:

- เลือก **Modify/Show Mass Source**
- ยกเลิกติ๊ก _Element Self Mass_
- ติ๊ก **Specified Load Patterns**
- ใส่ค่า:
  - Dead Load = 1.0 (100%)
  - SDL = 1.0 (100%)
  - Live Load = 0.25 (25% ตามมาตรฐานสำหรับอาคารทั่วไป)

---

## 3. Response Spectrum (แผ่นดินไหวแบบพลศาสตร์) - _สำหรับตึกสูง_

ตึกสูงต้องวิเคราะห์แบบ Dynamic Analysis เพื่อดูผลของโหมดการสั่นที่สูงขึ้น

1.  **Define > Functions > Response Spectrum:** สร้างกราฟความเร่งตามมาตรฐาน
2.  **Define > Load Cases:** Add New Case
3.  Load Case Type: `Response Spectrum`
4.  ใส่ทิศทาง U1 (แกน X) และ U2 (แกน Y) พร้อม Scale Factor ($g \times I/R$)

---

## 4. Load Combinations (การรวมแรง)

ไปที่ **Define > Load Combinations**:

- **Add Default Design Combos:** เลือก _Concrete Frame Design_ และ _Shear Wall Design_
- ETABS จะสร้างคู่สมการให้อัตโนมัติ (1.4DL, 1.2DL+1.6LL, etc.)

---

## 5. การใส่แรง (Assign Loads)

- **Area Loads (พื้น):** เลือกพื้น > Assign > Shell Loads > Uniform
- **Line Loads (ผนังบนคาน):** เลือกคาน > Assign > Frame Loads > Distributed (หน่วย `kgf/m` หรือ `Ton/m`)
- **Point Loads (เครื่องจักร):** เลือกจุดต่อ > Assign > Joint Loads > Force

---

## ✍️ Tutorial: ใส่แรงคอนโด 30 ชั้น (ต่อ)

### 1. สร้างรูปแบบแรง (Define Load Patterns)

ไปที่เมนู **Define > Load Patterns**:

1.  **SDL:**
    - พิมพ์ช่อง Load: `SDL`
    - Type: เลือก `Super Dead`
    - Self Weight: `0`
    - กด **Add New Load**
2.  **WindX:**
    - พิมพ์: `WindX`
    - Type: `Wind`
    - Auto Lateral Load: `ASCE 7-16` -> กด **Add New Load**
    - คลิก **Modify Lateral Load** -> Exposure Parameters:
      - Wind Speed: `38` m/s
      - Exposure Type: `B`
      - กด OK
3.  **EQx:**
    - พิมพ์: `EQx`
    - Type: `Seismic`
    - Auto Lateral Load: `ASCE 7-16` -> กด **Add New Load**
    - คลิก **Modify Lateral Load** -> Seismic Coefficients:
      - Ss: `0.165`
      - S1: `0.086`
      - Site Class: `D`
      - กด OK

### 2. แหล่งกำเนิดมวล (Mass Source)

ไปที่เมนู **Define > Mass Source**:

1.  คลิก **Modify/Show Mass Source**
2.  ติ๊กถูก **Specified Load Patterns** (และเอาเครื่องหมายถูกหน้า Element Self Mass ออก)
3.  ในตาราง Load Patterns Add:
    - `Dead` = 1.0
    - `SDL` = 1.0
    - `Live` = 0.25
4.  กด OK -> OK

### 3. ใส่แรงกระทำ (Assign Loads)

1.  เปลี่ยนมุมมองขวาล่างเป็น **Similar Stories** (ไปที่ชั้น 30F)
2.  **Super Dead Load (พื้น):**
    - คลิกเลือกพื้นทั้งหมด (คลิกซ้ายที่พื้นกลางห้องทุกห้อง)
    - เมนู **Assign > Shell Loads > Uniform**
    - Load Pattern: `SDL`, Load: `150` kg/m² -> OK
3.  **Live Load (พื้น):**
    - กดปุ่ม **ps** (Previous Select) ที่ Toolbar เพื่อเลือกพื้นซ้ำ
    - เมนู **Assign > Shell Loads > Uniform**
    - Load Pattern: `Live`, Load: `200` kg/m² -> OK
4.  **Load Combinations (สร้างอัตโนมัติ):**
    - เมนู **Define > Load Combinations**
    - คลิก **Add Default Design Combos**
    - ติ๊กถูก **Concrete Frame Design** และ **Shear Wall Design** -> OK -> OK

พร้อมสำหรับการ Run Analysis แล้วครับ!
ถ้าเป็นโครงการในไทยให้ไปบทที่ 7 ก่อน (มาตรฐาน มยผ.) จากนั้นค่อยไปบทที่ 8; ถ้าใช้แนวทางสากลเดิมของ Workshop ให้ไปบทที่ 8 ได้เลย
