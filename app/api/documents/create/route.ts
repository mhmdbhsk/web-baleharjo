import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import {
  documentRequests,
  letterStatements,
  businessLetterRequests,
  landAppraisalLetters,
  DocumentType
} from '@/db/schema';
import { getCurrentUser } from '@/lib/auth/get-current-user';

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    // Remove nik from base required fields
    const baseRequiredFields = ['type', 'name', 'address', 'rtId', 'rwId'];

    const typeRequiredFields: Record<DocumentType, string[]> = {
      [DocumentType.LETTER_STATEMENT]: [
        'placeDateOfBirth',
        'religion',
        'occupation',
        'maritalStatus',
        'letterPurpose'
      ],
      [DocumentType.BUSINESS_LETTER]: [
        'businessName',
        'businessType',
        'businessAddress'
      ],
      [DocumentType.LAND_APPRAISAL]: [
        'no',
        'certificate',
        'noC',
        'noPersil',
        'area',
        'builtOn',
        'boundaryNorth',
        'boundarySouth',
        'boundaryEast',
        'boundaryWest',
        'sinceDate',
        'occupation',
        'usedFor',
        'appraisalPrice'
      ]
    };


    const missingBaseFields = baseRequiredFields.filter(field => !data[field]);
    if (missingBaseFields.length > 0) {
      return NextResponse.json({
        error: `Missing required fields: ${missingBaseFields.join(', ')}`,
      }, { status: 400 });
    }


    const requiredTypeFields = typeRequiredFields[data.type as DocumentType];
    const missingTypeFields = requiredTypeFields.filter(field => {
      const value = field.split('.').reduce((obj, key) => obj?.[key], data);
      return !value;
    });

    if (missingTypeFields.length > 0) {
      return NextResponse.json({
        error: `Missing required fields for ${data.type}: ${missingTypeFields.join(', ')}`,
      }, { status: 400 });
    }


    const [documentRequest] = await db
      .insert(documentRequests)
      .values({
        type: data.type,
        name: data.name,
        nik: data.nik || '', // Make NIK optional
        address: data.address,
        purpose: data.purpose || '',
        description: data.description || '',
        status: 'PENDING',
        rtId: data.rtId,
        rwId: data.rwId,
        areaRt: data.areaRt,
        areaRw: data.areaRw,
        userId: currentUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();


    if (documentRequest) {
      switch (data.type) {
        case DocumentType.LETTER_STATEMENT:
          await db.insert(letterStatements).values({
            name: data.name,
            address: data.address,
            placeDateOfBirth: data.placeDateOfBirth,
            kkNumber: data.kkNumber || '',
            ktpNumber: data.ktpNumber || '',
            nationality: data.nationality || 'Indonesia',
            religion: data.religion,
            occupation: data.occupation,
            maritalStatus: data.maritalStatus,
            letterPurpose: data.letterPurpose,
            additionalInfo: data.additionalInfo || '',
            documentRequestId: documentRequest.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          break;

        // case DocumentType.BUSINESS_LETTER:
        //   await db.insert(businessLetterRequests).values({
        //     address: '',
        //     mothersName: data.mothersName,
        //     name: '',
        //     nationality: data.nationality,
        //     // nik: data.ktp
        //     business: data.businessName,
        //     businessType: data.businessType,
        //     businessAddress: data.businessAddress,
        //     businessDescription: data.businessDescription || '',
        //     documentRequestId: documentRequest.id,
        //     createdAt: new Date(),
        //     updatedAt: new Date(),
        //   });
        //   break;

        // case DocumentType.LAND_APPRAISAL:
        //   await db.insert(landAppraisalLetters).values({
        //     documentRequestId: documentRequest.id,
        //     createdAt: new Date(),
        //     updatedAt: new Date(),
        //     appraisalPrice: data.appraisalPrice,
        //     area: data.area,
        //     boundaryEast: data.boundaryEast,
        //     boundaryNorth: data.boundaryNorth,
        //     boundaryWest: data.boundaryWest,
        //     boundarySouth: data.boundarySouth,
        //     builtOn: data.builtOn,
        //     certificate: data.certificate,
        //     no: data.no,
        //     noC: data.noC,
        //     noPersil: data.noPersil,
        //     occupation: data.occupation,
        //     sinceDate: data.sinceDate,
        //     usedFor: data.userFor,
        //     name: data.name,
        //     address: data.address,
        //     certificateNumber: data.certificate,
        //   });
        //   break;
      }
    }

    return NextResponse.json({
      message: 'Document request created successfully',
      data: documentRequest,
    });
  } catch (error) {
    console.error('Error creating document request:', error);
    return NextResponse.json(
      {
        error: 'Failed to create document request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}